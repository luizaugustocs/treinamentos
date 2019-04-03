import {GraphQLResolveInfo} from "graphql";
import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {PostInstance} from "../../../models/PostModel";
import {Transaction} from "sequelize";
import {handleError} from "../../../utils/utils";
import {withAuthResolver} from "../../composable";
import {ResolverContext} from "../../../interfaces/ResolverContextInterface";

export const postResolvers = {

    Post: {
        author: (post: PostInstance, {id},{dataloaders} : ResolverContext, info: GraphQLResolveInfo) => {
            return dataloaders.userLoader.load(post.get('author')).catch(handleError);
        },
        comments: (post: PostInstance, {first = 10, offset = 0},{db, requestedFields} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: {post: post.get('id')},
                limit: first,
                offset,
                attributes: requestedFields.getFields(info)
            }).catch(handleError)
        },
    },

    Query: {

        posts: (parent, {first = 10, offset = 0},{db, requestedFields} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                limit: first,
                offset,
                attributes: requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
            }).catch(handleError)
        },
        post: (parent, {id},{db} : {db : DBConnection}, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);
            return db.Post.findById(parsedId)
                .then((post: PostInstance) => {
                    if (!post) {
                        throw new Error(`Post with id ${parsedId} not found.`)
                    }
                }).catch(handleError)
        },

    },

    Mutation: {

        createPost: withAuthResolver((parent, {input}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                input.author = authUser.id;
                return db.Post.create(input, {transaction});
            }).catch(handleError)
        }),
        updatePost: withAuthResolver((parent, {id, input}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Post
                    .findById(parsedId)
                    .then((post: PostInstance) => {
                        if (!post) {
                            throw new Error(`Post with id ${parsedId} not found.`)
                        }
                        if (post.get('author') !== authUser.id) {
                            throw new Error(`Forbidden. You can only edit your own posts.`)
                        }
                        input.author = authUser.id;
                        return post.update(input, {transaction})
                    })
            }).catch(handleError)
        }),
        deletePost: withAuthResolver((parent, {id}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Post
                    .findById(parsedId)
                    .then((post: PostInstance) => {
                        if (!post) {
                            throw new Error(`Post with id ${parsedId} not found.`)
                        }
                        if (post.get('author') !== authUser.id) {
                            throw new Error(`Forbidden. You can only delete your own posts.`)
                        }
                        return post.destroy({transaction})
                            .then((post) => Boolean(post))
                    })
            }).catch(handleError)
        }),

    }
};