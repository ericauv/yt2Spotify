import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const YoutubeForm = props => {
  const { setPlaylistId, setIsListVisible, isListVisible } = props;
  const handleOnSubmit = e => {
    e.preventDefault();
    setIsListVisible(!isListVisible);
  };
  return (
    <form onSubmit={e => handleOnSubmit(e)}>
      <label>Youtube Playlist URL</label>
      <input
        type="text"
        onChange={e => setPlaylistId(e.currentTarget.value)}
      ></input>
      <button type="submit">Start Converting</button>
    </form>
  );
};

export default YoutubeForm;
