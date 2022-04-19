const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('../schemas');

const apolloServer = async function (app, port) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  console.log(
    `Use GraphQL at http://localhost:${port}${server.graphqlPath}`.bgGreen
  );
};

module.exports = apolloServer;
