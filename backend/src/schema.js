const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
  type Item {
    id: ID!
    checked: Boolean
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
  }
  type SpotifyPlaylist {
    name: String!
    uid: String
  }
  input YoutubeItemInput {
    id: ID!
    title: String
  }

  # input SpotifyPlaylistCreateInput{

  # }
  type Query {
    youtubeItems(playlistId: String): [YoutubeItem]
    spotifyTrack(q: String!): SpotifyItem
    # spotifyTrack(q: String!): SpotifyItem
    spotifyItems(youtubeItems: [YoutubeItemInput]): [SpotifyItem]
    spotifyPlaylist(name: String!, userId: String!): SpotifyPlaylist
  }
  type Mutation {
    changeHello(cool: String): String
  }
`;

module.exports = schema;
