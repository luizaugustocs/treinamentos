import {GraphQLResolveInfo} from "graphql";
import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {UserInstance} from "../../../models/UserModel";
import {Transaction} from "sequelize";

export const userResolvers = {

    User: {
        posts: (user: UserInstance, {first = 10, offset = 0}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                where: {author: user.get('id')},
                limit: first,
                offset
            })
        },
    },

    Query: {
        users: (parent, {first = 10, offset = 0}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.User.findAll({
                limit: first,
                offset
            })
        },

        user: (parent, {id}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.User.findById(id)
                .then((user: UserInstance) => {
                    if (!user) {
                        throw new Error(`User with id ${id} not found.`)
                    }
                    return user;
                })
        }
    },

    Mutations: {
        createUser: (parent, {input}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User.create(input, {transaction});
            })
        },
        updateUser: (parent, {id, input}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User
                    .findById(parsedId)
                    .then((user: UserInstance) => {
                        if (!user) {
                            throw new Error(`User with id ${parsedId} not found.`)
                        }
                        return user.update(input, {transaction})
                    })
            })
        },
        updateUserPassword: (parent, {id, input}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User
                    .findById(parsedId)
                    .then((user: UserInstance) => {
                        if (!user) {
                            throw new Error(`User with id ${parsedId} not found.`)
                        }
                        return user.update(input, {transaction})
                            .then((user: UserInstance) => Boolean(user))
                    })
            })
        },


        deleteUser: (parent, {id}, {db} : {db: DBConnection}, info: GraphQLResolveInfo) => {
            const parsedId = parseInt(id);

            return db.sequelize.transaction((transaction: Transaction) => {
                return db.User
                    .findById(parsedId)
                    .then((user: UserInstance) => {
                        if (!user) {
                            throw new Error(`User with id ${parsedId} not found.`)
                        }
                        return user.destroy({transaction})
                            .then((user) => Boolean(user))
                    })
            })
        },


    }

};
