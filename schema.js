const { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query{
        hello: String
    }
    type Mutation{
        changeHello: String
    }
`);

module.exports = schema;
