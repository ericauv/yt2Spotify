const axios = require('axios');
const source = axios.CancelToken.source();
require('dotenv').config({ path: 'variables.env' });

async function getYoutubePlaylistPage(playlistId, nextPageToken) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&${
    nextPageToken ? `pageToken=${nextPageToken}&` : null
  }&maxResults=50&key=${process.env.YOUTUBE_SECRET}`;
  const response = await axios(url, { method: 'GET' });

  const { data } = response;
  const page = {
    nextPageToken: data.nextPageToken,
    items: data.items,
  };
  return page;
}

function getYoutubeParsedItems(items) {
  const youtubeItems = items.map((item, index) => {
    return {
      id: index,
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

// [{itemId, title}] => [{itemId, searchTerm}] => [{itemId, uri, track, artist, album}]

async function searchSpotifyTrack(searchTerm, limit = 10) {
  const instance = axios.create();
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${process.env.SPOTIFY_SECRET}`;
      config.headers.Accept = 'application/json';
      console.log(config);
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // assumes most popular search result is desired result
  const q = searchTerm.replace(' ', '%20');
  const url = `https://api.spotify.com/v1/search?q=${q}&type=track`;
  const response = await instance.get(url);
  const track = response.data.tracks.items.find(item =>
    item.uri.includes('spotify:track:')
  );
  const spotifyItem = {
    uri: track.uri.split('spotify:track:')[1],
  };

  return spotifyItem;
}

function getSpotifyItems(youtubeItems) {
  const promises = youtubeItems.map(item => searchSpotifyTrack(item.title));
  return promises;
}

async function addToSpotifyPlaylist(playlistId, tracks) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const uris = {
    uris: [],
  };
  const response = await axios(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uris),
  });
  const responseJson = await response.json();
}


function createPlaylist(name, userId) {
  const playlistId = '';
  return playlistId;
}

const Query = {
  youtubeItems: async (parent, args, ctx, info) => {
   return { youtubeList: getYoutubeItems(args.playlistId) };
  },
  // spotifyItems: async (parent, args, ctx, info) => {
  //   getSpotifyItems(args.youtubeItems);
  // },
  spotifyTrack: (parent, args, ctx, info) => {
    return searchSpotifyTrack(args.q);
  },

  // spotifyWidget: (parent, args, ctx, info) => {
  //   const playlistId = createPlaylist(
  //     args.playlistName,
  //     args.userId,
  //     args.auth
  //   );

  boo: () => {
    return 'boo';
  },
  list: (parent, args, ctx, info) => {
    const ytList = getYoutubeItems(args.playlistId);
    return {
      youtubeList: getYoutubeItems(args.playlistId),
      spotifyList: getSpotifyItems(args.youtubeItems),
    };
  },
};

module.exports = Query;
