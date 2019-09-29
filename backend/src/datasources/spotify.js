const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({ path: 'variables.env' });

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async searchSpotifyTrack(searchTerm, limit = 10) {
    const headers = {
          "Authorization": `Bearer ${process.env.SPOTIFY_SECRET}`;
          "Accept": 'application/json';
        },
        this.get('addurl',undefined,{headers});

    const q = searchTerm.replace(' ', '%20');
    const url = `search?q=${q}&type=track`;
    const response = await instance.get(url);
    const track = response.data.tracks.items.find(item =>
      item.uri.includes('spotify:track:')
    );
    const spotifyItem = {
      uri: track.uri.split('spotify:track:')[1]
    };

    return spotifyItem;
  }
module.exports = SpotifyAPI;
