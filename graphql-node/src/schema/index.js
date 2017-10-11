import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';


const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
        postedBy: User
        votes: [Vote!]!
    }

    type User {
        id: ID!,
        name: String!,
        email: String
        votes: [Vote!]!
    }

    type SigninPayload {
        token: String,
        user: User
    }

    type Vote {
        id: ID!
        user: User!
        link: Link!
    }
    
    type LinkSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Link
    }
    
    type Query {
       allLinks(filter: LinkFilter): [Link!]!
    } 

    type Mutation {
        createLink(url: String!, description: String!): Link
        createVote(linkId: ID!): Vote
        createUser(name: String!, authProvider: AuthProviderSignupData!): User
        signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
    }
    
    type Subscription {
        Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
    }
    
    input LinkFilter {
        OR: [LinkFilter!]
        description_contains: String
        url_contains: String
    }
    
    input LinkSubscriptionFilter {
        mutation_in: [_ModelMutationType!]
    }

    input AuthProviderSignupData {
        email: AUTH_PROVIDER_EMAIL
    }

    input AUTH_PROVIDER_EMAIL {
        email: String!,
        password: String!
    }
    
    enum _ModelMutationType {
        CREATED
        UPDATED
        DELETED
    }
    
`;

export default makeExecutableSchema({typeDefs, resolvers});