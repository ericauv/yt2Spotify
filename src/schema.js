const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
  type YoutubePlaylist {
    items: [YoutubeItem]!
    nextPageToken: String
  }
  type YoutubeItem {
    id: ID!
    title: String #snippet.title
  }
  type Query {
    hello: String
    boo: String
    getYoutubePlaylistItems(playlistId: String): YoutubePlaylist
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
