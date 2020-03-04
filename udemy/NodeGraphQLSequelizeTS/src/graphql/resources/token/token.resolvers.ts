import {DBConnection} from "../../../interfaces/DBConnectionInterface";
import {UserInstance} from "../../../models/UserModel";
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../../utils/utils";

export const tokenResolvers = {

    Mutation: {
        createToken: (parent, {email, password},{db} : {db : DBConnection}) => {
            return db.User.findOne({
                where: {email},
                attributes: ['id', 'password']
            }).then((user:  UserInstance) => {
                if (!user || !user.isPassword(user.get('password'), password)) {
                    throw new Error('Unauthorized, wrong email or password.');
                }

                const payload = { sub: user.get('id')};
                return {
                    token: jwt.sign(payload, JWT_SECRET)
                }

            })
        }
    }
};