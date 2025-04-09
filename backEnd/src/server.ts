import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { context } from './context';
import { formatError } from "./errors";

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
