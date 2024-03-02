export const typeDefs = `#graphql
    enum UserRole{
            ADMIN
            USER
            MANAGER
    }
    type User{
        id: ID!
        name: String!
        email: String
        username: String!
        profile: Profile
        role: String
        roomId: ID,
        room: Room
    }
`;
