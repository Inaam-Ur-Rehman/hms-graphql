export const mutations = `#graphql
    createMenu(payload: createMenuPayload!): Menu!
    updateMenu(payload: updateMenuByDayPayload!): Menu!
    deleteMenu(day: Day!): String!
`;
