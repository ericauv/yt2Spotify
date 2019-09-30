require('dotenv').config({ path: 'variables.env' });

// [{itemId, title}] => [{itemId, searchTerm}] => [{itemId, uri, track, artist, album}]

// async function addToSpotifyPlaylist(playlistId, tracks) {
//   const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
//   const uris = {
//     uris: []
//   };
//   const response = await axios(url, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.SPOTIFY_SECRET}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(uris)
//   });
//   const responseJson = await response.json();
// }

// function createPlaylist(name, userId) {
//   const playlistId = '';
//   return playlistId;
// }

const Query = {
  youtubeItems: async (
    _,
    { playlistId },
    { dataSources: { youtubeAPI } },
    info
  ) => {
    return youtubeAPI.getItems(playlistId);
  },
  spotifyItems: async (
    _,
    { youtubeItems },
    { dataSources: { spotifyAPI } },
    info
  ) => {
    return spotifyAPI.getSpotifyItems(youtubeItems);
  },
  spotifyTrack: (_, { q }, { dataSources: { spotifyAPI } }, info) => {
    return spotifyAPI.searchSpotifyTrack(q);
  },
  spotifyPlaylist: async (_, args, ctx, info) => {
    return createPlaylist(args.name, args.uerID);
  },
  spotifyAddTracksToPlaylist: async (
    _,
    { playlistId, uris },
    { dataSources: { spotifyAPI } }
  ) => {
    return spotifyAPI.addTracksToPlaylist(playlistId, uris);
  },
  spotifyPlaylist: async (_, args, { dataSources: { spotifyAPI } }, info) => {
    // create a playlist
    // add tracks to the playlist
    return spotifyAPI.createPlaylist(args.name, args.userId);
  },

  // spotifyWidget: (_, args, ctx, info) => {
  //   const playlistId = createPlaylist(
  //     args.playlistName,
  //     args.userId,
  //     args.auth
  //   );
};

module.exports = Query;
