export const queries = `#graphql
    rooms: [Room]
    roomByNumber(roomNumber:Int!): Room
    roomById(id:ID!): Room
`;
