const { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query{
        hello: String,
        boo:String
    }
    type Mutation{
        changeHello(cool:String): String
    }
`);

module.exports = schema;
