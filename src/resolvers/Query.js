const axios = require('axios');
require('dotenv').config({ path: 'variables.env' });

async function getYoutubePlaylistPage(playlistId, nextPageToken) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&${
    nextPageToken ? `pageToken=${nextPageToken}&` : null
  }&maxResults=50&key=${process.env.YOUTUBE_SECRET}`;
  const response = await axios(url, { method: 'GET' });
  const { data } = response;
  const page = {
    nextPageToken: data.nextPageToken,
    items: data.items
  };
  return page;
}

function getYoutubeParsedItems(items) {
  const youtubeItems = items.map(item => {
    return {
      title: item.snippet.title,
      parsedTitle: parseSearchTermFromYoutubeTitle(item.snippet.title),
      image: item.snippet.thumbnails.default.url
    };
  });
  return youtubeItems;
}
async function getYoutubeItems(playlistId) {
  let page = {};
  const items = [];
  do {
    page = await getYoutubePlaylistPage(playlistId, page.nextPageToken);
    items.push(...page.items);
  } while (page.nextPageToken);
  return getYoutubeParsedItems(items); // returns [{title,description, image},{...},...]
}

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
  const regex = /off?icial (video|music|audio)|music video|[\(\[\{](rate|audio|video|off?ici)/;

  // find index of start of regex match
  const foundIndex = searchTerm.search(regex);
  if (foundIndex !== -1) {
    searchTerm = searchTerm.slice(0, foundIndex);
  }

  return searchTerm;
}

async function searchSpotifyTrack(searchTerm, limit = 10) {
  // assumes most popular search result is desired result
  q = searchTerm.replace(' ', '%20');
}

// function addToSpotifyPlaylist(playlistId, tracks, auth) {
//   const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
//   const uris = {
//     "uris" :[]
//   }
//   const response = await fetch(url, {
//     method: 'POST',
//     credentials:  `Bearer ${auth}`,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(uris)
//   });
//   const responseJson = await response.json()
// }

function createPlaylist(name, userId, auth) {
  const playlistId = '';
  return playlistId;
}

const Query = {
  youtubeItems: async (parent, args, ctx, info) => {
    return { youtubeList: getYoutubeItems(args.playlistId) };
  }
  // spotifyWidget: (parent, args, ctx, info) => {
  //   const playlistId = createPlaylist(
  //     args.playlistName,
  //     args.userId,
  //     args.auth
  //   );

  // addToSpotifyPlaylist(playlistId, tracks);
  // return `https://open.spotify.com/embed/playlist/${playlistId}`;
  // },

  // list: (parent, args, ctx, info) => {
  //   const ytList = getYoutubeItems(args.playlistId);
  //   var promise = new Promise()
  //   return {youtubeList: ytList, spotifyList: promise.then()};
  // }
};

module.exports = Query;
