export const mutations = `#graphql 
    createFee(input:CreateFeeInput): Fee
    updateFeeById(
        id: ID!
        userId: ID
        month: String
        amount: Int
    ): Fee
    deleteFee(id: ID!): String
`;
