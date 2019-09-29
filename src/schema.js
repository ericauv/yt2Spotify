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
    item: Item
    track: String
    artist: String
    album: String
    image: String
    uri: String
  }
  type YoutubeItem {
    item: Item
    title: String
    description: String
    image: String
  }
  type Query {
    hello: String
    boo: String
    youtubeItems(playlistId: String): List
    list(ytPlaylistId: String!): List
    spotifyTrack(q: String!): SpotifyItem
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
