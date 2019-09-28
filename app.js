const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const root = {
  ...Query,
  ...Mutation
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log('GraphQL API server running on http://localhost:4000/graphql');
});
