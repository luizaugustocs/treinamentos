import {GraphQLResolveInfo} from "graphql";
import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {CommentInstance} from "../../../models/CommentModel";
import {Transaction} from "sequelize";


export const commentResolvers = {

    Comment: {
        user: (comment: CommentInstance, params, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.User.findById(comment.get('user'))
        },
        post: (comment: CommentInstance, params, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.Post.findById(comment.get('post'))
        }
    },

    Query: {

        commentsByPost: (parent, {postId, first = 10, offset = 0}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: {post: postId},
                limit: first,
                offset
            })

        }
    },

    Mutation: {
        createComment: (parent, {input}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                    return db.Comment.create(input, {transaction});
                }
            )
        },
        updateComment: (parent, {id, input}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Comment
                    .findById(parsedId)
                    .then((comment: CommentInstance) => {
                        if (!comment) {
                            throw new Error(`Comment with id ${parsedId} not found.`)
                        }
                        return comment.update(input, {transaction})
                    })
            })
        },
        deleteComment: (parent, {id}, {db}: { db: DBConnection }, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.Comment
                    .findById(parsedId)
                    .then((comment: CommentInstance) => {
                        if (!comment) {
                            throw new Error(`Comment with id ${parsedId} not found.`)
                        }
                        return comment.destroy({transaction})
                            .then(comment => Boolean(comment))
                    })
            })
        }
    }
};