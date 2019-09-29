const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
  type Item {
    id: ID!
    checked: Boolean
  }
  type YoutubeItemList {
    items: [YoutubeItem]
  }
  type SpotifyItemList {
    items: [SpotifyItem]
  }

  type SpotifyItem {
    item: Item
    track: String
    artist: String
    album: String
    image: String
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
    getYoutubeItems(playlistId: String): YoutubePlaylist
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
