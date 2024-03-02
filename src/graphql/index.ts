import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Profile } from "./profile";
import { Room } from "./room";
import { Menu } from "./menu";

const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs: `
    ${Profile.typeDefs}
    ${User.typeDefs}
    ${Room.typeDefs}
    ${Menu.typeDefs}
      type Query {
        ${User.queries}
        ${Profile.queries}
        ${Room.queries}
        ${Menu.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Profile.mutations}
        ${Room.mutations}
        ${Menu.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Profile.resolvers.queries,
        ...Room.resolvers.queries,
        ...Menu.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Profile.resolvers.mutations,
        ...Room.resolvers.mutations,
        ...Menu.resolvers.mutations,
      },
    },
  });

  await server.start();

  return server;
};

export default createApolloServer;
