const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
  type List {
    YoutubePlaylist: [YoutubeItem]
    SpPlaylist: [SpotifyItem]
  }
  type Playlist {
    items: [PlaylistItem]!
  }
  type PlaylistItem {
    youtubeItem: YoutubeItem
    spotifyItem: SpotifyItem
    checked: Boolean
  }
  type YoutubeItem {
    title: String
    description: String
    image: String
  }
  type SpotifyItem {
    track: String
    artist: String
    album: String
    image: String
    uri: String
  }
  type Query {
    hello: String
    boo: String
    getYoutubePlaylistItems(playlistId: String): YoutubePlaylist
    list(ytPlaylistId: String!): List
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
