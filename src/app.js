const express = require('express');
require('dotenv').config({ path: 'variables.env' });
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = { Query, Mutation };

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen('35050').then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
