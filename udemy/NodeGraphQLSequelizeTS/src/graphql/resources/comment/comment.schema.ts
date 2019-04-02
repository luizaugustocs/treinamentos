export const commentTypes = `
    
    type Comment {
        id: ID!
        comment: String!
        createdAt: String!
        updatedAt: String!
        user: User!
        post: Post!
    }
    
    input CommentInput {
        comment: String!
        post: Int!
    }

`;

export const commentQueries = `
    
    commentsByPost(postId: ID!, first: Int, offset: Int): [Comment!]!

`;

export const commentMutations = `

    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`;