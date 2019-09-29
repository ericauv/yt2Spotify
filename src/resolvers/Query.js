const axios = require('axios');
require('dotenv').config({ path: 'variables.env' });
// {
//   "items": [
//       {
//           "id": "UEx4MHNZYkNxT2I4VEJQUmRtQkhzNUlmdHZ2OVRQYm9ZRy4zQkJFRDhFODIxQzU3NDY2",
//           "snippet": {
//               "title": "Ariana Grande, Miley Cyrus, Lana Del Rey - Don’t Call Me Angel (Charlie’s Angels)",
//               "description": "Official music video by Ariana Grande, Miley Cyrus, Lana Del Rey performing “Don’t Call Me Angel (Charlie’s Angels)” – available now: https://charliesangels.lnk.to/dcmaYD\n\n►Follow Charlie’s Angels Online\nAdvanced Tickets: https://www.charliesangels.movie/tickets/?hs308=AG \nWatch Trailer: https://www.youtube.com/watch?v=RSUq4VfWfjE&t=52s\nInstagram: https://www.instagram.com/charliesangels/\nFacebook: https://www.facebook.com/CharliesAngels/\nTwitter: https://twitter.com/CharliesAngels\nWebsite: https://www.charliesangels.movie/?hs308=AG\n\n►Follow Ariana Grande Online\nInstagram: https://www.instagram.com/arianagrande \nFacebook: https://www.facebook.com/arianagrande/ \nTwitter: https://twitter.com/ArianaGrande \nWebsite: https://www.arianagrande.com/ \n\n►Follow Miley Cyrus Online\nInstagram: https://www.instagram.com/mileycyrus\nFacebook: https://www.facebook.com/MileyCyrus\nTwitter: https://twitter.com/MileyCyrus\nWebsite: https://mileycyrus.com/\n\n►Follow Lana Del Rey Online\nInstagram: https://www.instagram.com/lanadelrey/\nFacebook: https://www.facebook.com/lanadelrey\nTwitter: https://twitter.com/lanadelrey \nWebsite: https://lanadelrey.com/\n\nVideo Director: Hannah Lux Davis\nVideo Producer: Brandon Bonfiglio\nfor London Alley\n\n#CharliesAngels #DontCallMeAngel\n\nMusic video by Ariana Grande, Miley Cyrus, Lana Del Rey performing Don’t Call Me Angel (Charlie’s Angels). © 2019 Republic Records, a division of UMG Recordings, Inc. Motion Picture Artwork © CTMG.  All Rights Reserved.",
//               "thumbnails": {
//                   "default": {
//                       "url": "https://i.ytimg.com/vi/leopt__ATR0/default.jpg",
//                       "width": 120,
//                       "height": 90
//                   },

//               },
//           }
//       },...
//     ]
// }

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
  const youtubeItems = items.map(item=> {
    return ({title:item.snippet.title, description:item.snippet.description, image:item.snippet.thumbnails.default.url})})
  return youtubeItems;
}
async function getYoutubeItems(playlistId) {
  let page = {};
  const items = [];
  do  {
    page = await getYoutubePlaylistPage(playlistId, page.nextPageToken);
    items.push(...page.items);
  }while (page.nextPageToken)
  return getYoutubeParsedItems(items);
}



async function searchSpotifyTrack(searchTerm, limit = 10) {
  // assumes most popular search result is desired result
  q = searchTerm.replace(' ', '%20');
}

function addToSpotifyPlaylist(playlistId, tracks, auth) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
  const uris = {
    "uris" :[]
  }
  const response = await fetch(url, {
    method: 'POST',
    credentials:  `Bearer ${auth}`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(uris)
  });
  const responseJson = await response.json()
}

function createPlaylist(name, userId, auth) {
  const playlistId = '';
  return playlistId;
}

const Query = {

  youtubeItems: async (parent, args, ctx, info) => {
    getYoutubeItems(args.playlistId);
  },
  spotifyWidget: (parent, args, ctx, info) => {
    const playlistId = createPlaylist(
      args.playlistName,
      args.userId,
      args.auth
    );

    addToSpotifyPlaylist(playlistId, tracks);
    return `https://open.spotify.com/embed/playlist/${playlistId}`;
  },
  boo: () => {
    return 'boo';
  },
  list: (parent, args, ctx, info) => {
    const ytList = getYoutubePlaylistItems(args.playlistId);
    var promise = new Promise()
    return {youtubeList: ytList, spotifyList: promise.then()};
  }
};

module.exports = Query;
