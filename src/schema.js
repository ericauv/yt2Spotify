const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
  type YoutubePlaylistList {
    id: ID!
    items: [YoutubePlaylist]!
  }
  type YoutubePlaylist {
    id: ID!
    title: String #snippet.title
  }
  type Query {
    hello: String
    boo: String
    getYoutubePlaylistItems(playlistId: String): String
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
