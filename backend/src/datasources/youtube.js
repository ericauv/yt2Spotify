const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({ path: 'variables.env' });

class YoutubeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  }
  async getPageOfItems(playlistId, nextPageToken) {
    const params = `?part=snippet&playlistId=${playlistId}&${
      nextPageToken ? `pageToken=${nextPageToken}&` : null
    }&maxResults=50&key=${process.env.YOUTUBE_SECRET}`;
    const responseData = await this.get(params);
    const page = {
      nextPageToken: responseData.nextPageToken,
      items: responseData.items
    };

    return page;
  }
  itemReducer(item, id) {
    return {
      id: id || 0,
      title: item.snippet && item.snippet.title,
      image:
        item.snippet &&
        item.snippet.thumbnails &&
        item.snippet.thumbnails.default &&
        item.snippet.thumbnails.default.url
    };
  }
  async getItems(playlistId) {
    let page = {};
    const items = [];
    do {
      page = await this.getPageOfItems(playlistId, page.nextPageToken);
      items.push(...page.items);
    } while (page.nextPageToken);
    return items.map((item, index) => this.itemReducer(item, index));
  }
}

module.exports = YoutubeAPI;
