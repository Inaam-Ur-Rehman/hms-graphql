export const typeDefs = `#graphql
    type Room{
        id: ID!
        roomNumber: Int!
        floor: Int
        users: [User]
        capacity: Int!
        status: Boolean
    }
`;
