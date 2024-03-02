export const mutations = `#graphql
    createRoom(roomNumber:Int!, floor:Int, capacity: Int!, status: Boolean): Room
    updateRoom(id:ID!,roomNumber:Int!, floor:Int, capacity: Int!, status: Boolean): Room
    deleteRoom(id:ID!): String
    assignRoom(userId: ID!, roomNumber:Int!): Room
    removeUserFromRoom(userId:ID!): String
`;
