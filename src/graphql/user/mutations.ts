export const mutations = `#graphql
    createUser(name: String!, username:String!, email: String, password:String!,role: UserRole): User
    updateUserById(id: ID!,name: String, username: String, email:String, password:String, role: UserRole): User
    deleteUser(id:ID!): String
`;
