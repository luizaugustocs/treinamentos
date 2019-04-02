import {NextFunction, Request, RequestHandler, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../utils/utils";
import db from '../models';
import {UserInstance} from "../models/UserModel";

export const extractJWTMiddleware = (): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {

        const authHeader = req.get("authorization");

        const token = authHeader ? authHeader.split(' ')[1]: undefined;

        req['context'] = {
            authorization: authHeader
        };

        if (!token) {
            return next()
        }

        jwt.verify(token, JWT_SECRET, ((err, decoded: any) => {
            if (err) {
                return next()
            }

            db.User.findById(decoded.sub, {
                attributes: ['id', 'email']
            }).then(( user: UserInstance ) => {
                if (user) {
                    req['context']['authUser'] = user
                }
                return next();
            })
        }))
    }
}