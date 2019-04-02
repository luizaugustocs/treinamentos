export const userTypes = `

    # User definition type 
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String
        createdAt: String!
        updatedAt: String!
        posts(first: Int, offset: Int): [Post!]!
    }
    
    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }
    
    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!
    }
    
    input UserUpdatePasswordInput {
        password: String!
    }

`;

export const userQueries = `
    users(first: Int, offset: Int): [User!]!
    user(id: ID!): User  
`;

export const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
    deleteUser: Boolean
`;