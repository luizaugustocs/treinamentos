import {makeExecutableSchema} from 'graphql-tools';
import {Query} from "./query";
import {Mutation} from "./mutation";
import {userTypes} from "./resources/user/user.schema";
import {postTypes} from "./resources/post/post.schema";
import {commentTypes} from "./resources/comment/comment.schema";
import {userResolvers} from "./resources/user/user.resolver";
import {postResolvers} from "./resources/post/post.resolvers";
import {commentResolvers} from "./resources/comment/comment.resolvers";
import {tokenTypes} from "./resources/token/token.schema";

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
        ...commentResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutations,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    User: {
        ...userResolvers.User
    },
    Post: {
        ...postResolvers.Post
    },
    Comment: {
        ...commentResolvers.Comment
    }
};

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition, Query, Mutation, userTypes, postTypes, commentTypes, tokenTypes
    ],
    resolvers
});