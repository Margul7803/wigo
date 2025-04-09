import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from '../interfaces/graphql/schema';
import { resolvers } from '../interfaces/graphql/resolvers';
import { context } from '../interfaces/graphql/context';
import { formatError } from "../interfaces/graphql/errors";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });

  console.log(`🚀 Serveur GraphQL prêt sur ${url}`);
};

startServer();
