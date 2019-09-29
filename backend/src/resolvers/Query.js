const axios = require('axios');
const source = axios.CancelToken.source();
require('dotenv').config({ path: 'variables.env' });
function parseSearchTermFromYoutubeTitle(title) {
  // replace 'ft.' with empty string
  let searchTerm = title.toLowerCase().replace('ft.', '');

  // find start of substring starting with
  // (OFFICIAL VIDEO...,
  // (OFFICIAL MUSIC VIDEO...,
  // [OFFICIAL MUSIC VIDEO...,
  // [OFFICIAL VIDEO,
  // (video...,
  // [Video...,
  // Official Music Video,
  // Official Video
  // [Official...]
  // (Official...)
  // (Rate
  // [Rate
  // {rate
  // only use substring before (audio), [audio]

  // regex visualization: http://tinyurl.com/yxgocub8
  const regex = /off?icial (video|music|audio)|music video|[\(\[\{](rate|audio|video|off?ici)/;

  // find index of start of regex match
  const foundIndex = searchTerm.search(regex);
  if (foundIndex !== -1) {
    searchTerm = searchTerm.slice(0, foundIndex);
  }

  return searchTerm;
}

// [{itemId, title}] => [{itemId, searchTerm}] => [{itemId, uri, track, artist, album}]

async function searchSpotifyTrack(searchTerm, limit = 10) {
  console.log(process.env.SPOTIFY_SECRET);

  const instance = axios.create();
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${process.env.SPOTIFY_SECRET}`;
      config.headers.Accept = 'application/json';
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const q = encodeURIComponent(searchTerm);
  const url = `https://api.spotify.com/v1/search?q=${q}&type=track`;
  const response = await instance.get(url);
  const track = response.data.tracks.items.find(item =>
    item.uri.includes('spotify:track:')
  );
  const spotifyItem = {
    uri: track.uri.split('spotify:track:')[1],
    track: track.name,
    artist: track.artists[0].name,
  };
  return spotifyItem;
}

function getSpotifyItems(youtubeItems) {
  const spotifyItems = youtubeItems.map(async item => {
    const spotifyItem = await searchSpotifyTrack(
      parseSearchTermFromYoutubeTitle(item.title)
    );
    spotifyItem.id = item.id;
    console.log(spotifyItem);
    return spotifyItem;
  });
  return spotifyItems;
}

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
  youtubeItems: async (_, { playlistId }, { dataSources }, info) => {
    return dataSources.youtubeAPI.getItems(playlistId);
  },
  spotifyItems: async (parent, args, ctx, info) => {
    return getSpotifyItems(args.input);
  },
  spotifyTrack: (parent, args, ctx, info) => {
    return searchSpotifyTrack(args.q);
  },
  spotifyPlaylist: async (parent, args, ctx, info) => {
    return createPlaylist(args.name, args.uerID);
  },

  // spotifyWidget: (parent, args, ctx, info) => {
  //   const playlistId = createPlaylist(
  //     args.playlistName,
  //     args.userId,
  //     args.auth
  //   );
};

module.exports = Query;
