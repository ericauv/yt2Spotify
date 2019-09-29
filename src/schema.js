const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
  type Item {
    id: ID!
    checked: Boolean
  }
  type List {
    youtubeList: [YoutubeItem]
    spotifyList: [SpotifyItem]
  }

  type SpotifyItem {
    id: ID!
    track: String
    artist: String
    album: String
    image: String
    uri: String
  }
  type YoutubeItem {
    id: ID!
    title: String
    image: String
    parsedTitle: String
  }
  type Query {
    hello: String
    boo: String
    youtubeItems(playlistId: String): List
    list(ytPlaylistId: String!): List
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
