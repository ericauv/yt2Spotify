const axios = require('axios');
require('dotenv').config({ path: 'variables.env' });

async function getYoutubePlaylistPage(playlistId, nextPageToken) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&${
    nextPageToken ? `pageToken=${nextPageToken}&` : null
  }&maxResults=50&key=${process.env.YOUTUBE_SECRET}`;
  const response = await axios(url, { method: 'GET' });
<<<<<<< HEAD
  const { data } = response;
  const page = {
    nextPageToken: data.nextPageToken,
    items: data.items
=======
  const playlist = {
    nextPageToken: response.data.nextPageToken,
    items: response.data.items,
>>>>>>> wip
  };
  return page;
}

async function getYoutubePlaylist(playlistId) {
  let page = {};
  const items = [];
  do while (page.nextPageToken) {
    page = getYoutubePlaylistPage(playlistId, page.nextPageToken);
    items.push(...playlist.items);
  }
  return items;
}


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
function getParsedYoutubeItems(items) {
  const youtubeItems = items.map(item=> {title:item.snippet.title, description:item.snippet.description, image:item.snippet.thumbnails.default.url})
  return youtubeItems;
}

async function searchSpotifyTrack(searchTerm, limit = 10) {
  // assumes most popular search result is desired result
  q = searchTerm.replace(' ', '%20');
}

function addToSpPlaylist(playlistId, tracks) {}

function createPlaylist(name, userId, auth) {
  const playlistId = '';
  return playlistId;
}

const Query = {
  getYoutubeItems: async (parent, args, ctx, info) => {
    getYoutubePlaylistItems(args.playlistId);
  },
  spotifyWidget: (parent, args, ctx, info) => {
    // return a default widget uri here
    const playlistId = createPlaylist(
      args.playlistName,
      args.userId,
      args.auth
    );
    const tracks = {};
    addToSpPlaylist(playlistId, tracks);
    return `https://open.spotify.com/embed/playlist/${playlistId}`;
  },
  boo: () => {
    return 'boo';
  },
};

module.exports = Query;
[title, title, title];
