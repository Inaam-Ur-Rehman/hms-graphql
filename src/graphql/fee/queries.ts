export const queries = `#graphql
    fees: [Fee]
    feeById(id: ID!): Fee
    feeByMonth(month: String!): Fee
    feeByYear(year: String!): Fee
    feeByMonthYear(month: String!, year: String!): Fee
    feeByUser(userId: ID!): Fee
`;
