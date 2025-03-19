import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Définition du schéma GraphQL
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Résolveurs
const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL without Express! 🚀",
  },
};

// Création du serveur Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Démarrer le serveur
const startServer = async () => {
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`🚀  Serveur GraphQL prêt sur ${url}`);
};

startServer();
