import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const handleOnSubmit = e => {
  // query for youtube items\
  e.preventDefault();
  console.log('submitted');
};

const YoutubeForm = () => {
  return (
    <form onSubmit={handleOnSubmit}>
      <label>Youtube Playlist URL</label>
      <input type="text"></input>
      <button type="submit">Start Converting</button>
    </form>
  );
};

export default YoutubeForm;
