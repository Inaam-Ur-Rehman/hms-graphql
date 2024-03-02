import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Profile } from "./profile";
import { Room } from "./room";
import { Menu } from "./menu";
import { Fee } from "./fee";

const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs: `
    ${Profile.typeDefs}
    ${User.typeDefs}
    ${Room.typeDefs}
    ${Menu.typeDefs}
    ${Fee.typeDefs}
      type Query {
        ${User.queries}
        ${Profile.queries}
        ${Room.queries}
        ${Menu.queries}
        ${Fee.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Profile.mutations}
        ${Room.mutations}
        ${Menu.mutations}
        ${Fee.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Profile.resolvers.queries,
        ...Room.resolvers.queries,
        ...Menu.resolvers.queries,
        ...Fee.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Profile.resolvers.mutations,
        ...Room.resolvers.mutations,
        ...Menu.resolvers.mutations,
        ...Fee.resolvers.mutations,
      },
    },
  });

  await server.start();

  return server;
};

export default createApolloServer;
