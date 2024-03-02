export const typeDefs = `#graphql
    type Menu {
        id: ID!
        day: String!
        breakfast: String!
        lunch: String!
        dinner: String!
    }
    enum Day {
        MONDAY
        TUESDAY
        WEDNESDAY
        THURSDAY
        FRIDAY
        SATURDAY
        SUNDAY
    }
    input createMenuPayload {
        day: Day!
        breakfast: String!
        lunch: String!
        dinner: String!
    }

    input updateMenuByDayPayload {
        day: Day!
        breakfast: String
        lunch: String
        dinner: String
    }
`;
