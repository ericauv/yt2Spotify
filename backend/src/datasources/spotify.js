const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({ path: 'variables.env' });

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }
  willSendRequest(request) {
    request.headers.set(
      'Authorization',
      `Bearer ${process.env.SPOTIFY_SECRET}`,
      'Accept',
      'application/json',
      'Content-Type',
      'application/json'
    );
  }

  async searchSpotifyTrack(searchTerm, id, limit = 5) {
    const q = encodeURIComponent(searchTerm);
    const endpoint = `/search?q=${q}&limit=${limit}&type=track`;
    const response = await this.get(endpoint);
    const track = response.tracks.items.find(item =>
      item.uri.includes('spotify:track:')
    );
    return this.itemReducer(track, id);
  }
  itemReducer(track, id) {
    return {
      id: id || 0,
      uri: track && `${track.uri}`,
      track: track && track.name,
      artist: track.artists[0].name,
    };
  }
  async getSpotifyItems(youtubeItems) {
    const spotifyItems = youtubeItems.map(async item => {
      const spotifyItem = await this.searchSpotifyTrack(
        this.parseSearchTermFromYoutubeTitle(item.title),
        item.id
      );
      return spotifyItem;
    });
    return spotifyItems;
  }

  async createPlaylist(playlistName, userId) {
    const endpoint = `/users/${userId}/playlists`;
    const body = { name: playlistName, public: true };
    const response = await this.post(endpoint, JSON.stringify(body));
    console.log(response.id);
    const playlistID = response.id;
    return playlistID;
  }

  parseSearchTermFromYoutubeTitle(title) {
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
      // index was found, remove everything after it
      searchTerm = searchTerm.slice(0, foundIndex);
    }

    return searchTerm;
  }

  async addPageOfTracksToPlaylist(playlistId, position, uris) {
    const endpoint = `playlists/${playlistId}/tracks`;
    const params = `?position=${position}`;
    const body = { uris };
    this.post(endpoint + params, body);
  }
  async addTracksToPlaylist(playlistId, uris) {
    const endpoint = `playlists/${playlistId}/tracks`;
    // Spotify api allows only 100 uris per request
    const pageSize = 100;
    const j = uris.length;
    for (let position = 0; position < j; position += pageSize) {
      this.addPageOfTracksToPlaylist(
        playlistId,
        position,
        uris.slice(position, position + pageSize)
      );
    }
    return `${uris.length} tracks added successfully to playlist with ID: ${playlistId}`;
  }
}
module.exports = SpotifyAPI;
