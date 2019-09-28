const axios = require('axios');
require('dotenv').config({ path: 'variables.env' });

async function getYoutubePlaylistItems(playlistId) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_SECRET}`;
  const response = await axios(url, { method: 'GET' });
  const playlist = {
    nextPageToken: response.data.nextPageToken,
    items: response.data.items
  };
  console.log(playlist);
  return playlist;
}

const Query = {
  getYoutubePlaylistItems: async (parent, args, ctx, info) => {
    getYoutubePlaylistItems(args.playlistId);
  },
  boo: () => {
    return 'boo';
  }
};

module.exports = Query;
