import {GraphQLResolveInfo} from "graphql";
import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {CommentInstance} from "../../../models/CommentModel";
import {Transaction} from "sequelize";
import {handleError} from "../../../utils/utils";
import {withAuthResolver} from "../../composable";
import {ResolverContext} from "../../../interfaces/ResolverContextInterface";


export const commentResolvers = {

    Comment: {
        user: (comment: CommentInstance, params, {db} : {db : DBConnection}, info: GraphQLResolveInfo) => {
            return db.User.findById(comment.get('user'))
                .catch(handleError);
        },
        post: (comment: CommentInstance, params, {db} : {db : DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post.findById(comment.get('post'))
                .catch(handleError);
        }
    },

    Query: {

        commentsByPost: (parent, {postId, first = 10, offset = 0}, {db} : {db : DBConnection}, info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: {post: parseInt(postId)},
                limit: first,
                offset
            }).catch(handleError);

        }
    },

    Mutation: {
        createComment: withAuthResolver((parent, {input}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                input.user = authUser.id;
                    return db.Comment.create(input, {transaction});
                }
            ).catch(handleError)
        }),
        updateComment: withAuthResolver((parent, {id,input}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Comment
                    .findById(parsedId)
                    .then((comment: CommentInstance) => {
                        if (!comment) {
                            throw new Error(`Comment with id ${parsedId} not found.`)
                        }
                        if (comment.get('user') !== authUser.id) {
                            throw new Error('Forbidden. You can only edit your own comments.')
                        }
                        input.user = authUser.id;
                        return comment.update(input, {transaction})
                    })
            }).catch(handleError)
        }),
        deleteComment:  withAuthResolver((parent, {id}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Comment
                    .findById(parsedId)
                    .then((comment: CommentInstance) => {
                        if (!comment) {
                            throw new Error(`Comment with id ${parsedId} not found.`)
                        }
                        if (comment.get('user') !== authUser.id) {
                            throw new Error('Forbidden. You can only delete your own comments.')
                        }
                        return comment.destroy({transaction})
                            .then(comment => Boolean(comment))
                    })
            }).catch(handleError)
        })
    }
};