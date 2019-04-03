import {GraphQLResolveInfo} from "graphql";
import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {UserInstance} from "../../../models/UserModel";
import {Transaction} from "sequelize";
import {handleError} from "../../../utils/utils";
import {withAuthResolver} from "../../composable";
import {ResolverContext} from "../../../interfaces/ResolverContextInterface";

export const userResolvers = {

    User: {
        posts: (user: UserInstance, {first = 10, offset = 0}, {db, requestedFields} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                where: {author: user.get('id')},
                limit: first,
                offset,
                attributes: requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
            }).catch(handleError)
        },
    },

    Query: {
        users: (parent, {first = 10, offset = 0}, {db, requestedFields} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.User.findAll({
                limit: first,
                offset,
                attributes: requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
            }).catch(handleError)
        },

        user: (parent, {id}, {db, requestedFields} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.User.findById(parseInt(id), {
                attributes: requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
            })
                .then((user: UserInstance) => {
                    if (!user) {
                        throw new Error(`User with id ${id} not found.`)
                    }
                    return user;
                }).catch(handleError)
        },
        currentUser: withAuthResolver((parent, args, {db, authUser, requestedFields} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.User
                .findById(authUser.id, {
                    attributes: requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
                })
                .then((user: UserInstance) => {
                    if (!user) {
                        throw new Error(`User with id ${authUser.id} not found.`)
                    }
                    return user;
                })
            })

    },

    Mutations: {
        createUser: (parent, {input}, {db} : {db : DBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User.create(input, {transaction});
            }).catch(handleError)
        },
        updateUser: withAuthResolver((parent, {input}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User
                    .findById(authUser.id)
                    .then((user: UserInstance) => {
                        if (!user) {
                            throw new Error(`User with id ${authUser.id} not found.`)
                        }
                        return user.update(input, {transaction})
                    })
            }).catch(handleError)
        }),
        updateUserPassword: withAuthResolver((parent, {input}, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User
                    .findById(authUser.id)
                    .then((user: UserInstance) => {
                        if (!user) {
                            throw new Error(`User with id ${authUser.id} not found.`)
                        }
                        return user.update(input, {transaction})
                            .then((user: UserInstance) => Boolean(user))
                    })
            }).catch(handleError)
        }),


        deleteUser: withAuthResolver((parent, args, {db, authUser} : ResolverContext, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User
                    .findById(authUser.id)
                    .then((user: UserInstance) => {
                        if (!user) {
                            throw new Error(`User with id ${authUser.id} not found.`)
                        }
                        return user.destroy({transaction})
                            .then((user) => Boolean(user))
                    })
            }).catch(handleError)
        }),


    }

};
