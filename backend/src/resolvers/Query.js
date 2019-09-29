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
    return dataSources.youtubeAPI.getItems(playlistId);
  },
  spotifyItems: async (
    parent,
    { youtubeItems },
    { dataSources: { spotifyAPI } },
    info
  ) => {
    return spotifyAPI.getSpotifyItems(youtubeItems);
  },
  spotifyTrack: (parent, { q }, { dataSources: { spotifyAPI } }, info) => {
    return spotifyAPI.searchSpotifyTrack(q);
  },
  spotifyPlaylist: async (parent, args, ctx, info) => {
    return createPlaylist(args.name, args.uerID);
  }

  // spotifyWidget: (parent, args, ctx, info) => {
  //   const playlistId = createPlaylist(
  //     args.playlistName,
  //     args.userId,
  //     args.auth
  //   );
};

module.exports = Query;
