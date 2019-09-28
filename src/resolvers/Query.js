const axios = require('axios');
require('dotenv').config({ path: 'variables.env' });

const Query = {
  getYoutubePlaylistItems: async (parent, args, ctx, info) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${args.playlistId}&maxResults=50&key=${process.env.YOUTUBE_SECRET}`;
    console.log(url);
    const response = await axios(url, { method: 'GET' });
    console.log(response);
    return response.data;
  },
  boo: () => {
    return 'boo';
  }
};

module.exports = Query;
