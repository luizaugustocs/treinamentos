import {ComposableResolver} from "./composable";
import {ResolverContext} from "../interfaces/ResolverContextInterface";
import {GraphQLFieldResolver} from "graphql";
import {extractToken, JWT_SECRET} from "../utils/utils";
import * as jwt from 'jsonwebtoken';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> =
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> =>
        (parent, args, context: ResolverContext, info) => {
            const token = extractToken(context.authorization);

            jwt.verify(token, JWT_SECRET, ((err) => {
                if (!err) {
                    return resolver(parent, args, context, info);
                }

                throw new Error(`${err.name}: ${err.message}`)
            }))
        }