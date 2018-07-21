import {GraphQLResolveInfo} from "graphql";
import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {PostInstance} from "../../../models/PostModel";
import {Transaction} from "sequelize";

export const postResolvers = {

    Post: {
        author: (post: PostInstance, {id}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.User.findById(post.get('author'));
        },
        comments: (post: PostInstance, {first = 10, offset = 0}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: {post: post.get('id')},
                limit: first,
                offset
            })
        },
    },

    Query: {

        posts: (parent, {first = 10, offset = 0}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                limit: first,
                offset
            })
        },
        post: (parent, {id}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);
            return db.Post.findById(parsedId)
                .then((post: PostInstance) => {
                    if (!post) {
                        throw new Error(`Post with id ${parsedId} not found.`)
                    }
                })
        },

    },

    Mutation: {

        createPost: (parent, {input}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Post.create(input, {transaction});
            })
        },
        updatePost: (parent, {id, input}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Post
                    .findById(parsedId)
                    .then((post: PostInstance) => {
                        if (!post) {
                            throw new Error(`Post with id ${parsedId} not found.`)
                        }
                        return post.update(input, {transaction})
                    })
            })
        },
        deletePost: (parent, {id}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Post
                    .findById(parsedId)
                    .then((post: PostInstance) => {
                        if (!post) {
                            throw new Error(`Post with id ${parsedId} not found.`)
                        }
                        return post.destroy({transaction})
                            .then((post) => Boolean(post))
                    })
            })
        },

    }
};