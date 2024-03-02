export const typeDefs = `#graphql

enum Month{
    JAN
    FEB
    MAR
    APR
    MAY
    JUN
    JUL
    AUG
    SEP
    OCT
    NOV
    DEC
}
    type Fee{
        id: ID!
        userId: ID!
        user: User!
        month: Month!
        amount: Int!
        createdAt: String!
        updatedAt: String!
    }

    input CreateFeeInput{
        userId: ID!
        month: Month!
        amount: Int!
    } 

    input UpdateFeeInputByUserId{
        userId: ID!
        month: Month
        amount: Int
    }

    input UpdateFeeInputById{
        id: ID!
        userId: ID
        month: Month
        amount: Int
    }

`;
