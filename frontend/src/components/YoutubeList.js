import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const YOUTUBE_ITEMS_QUERY = gql`
  query YOUTUBE_ITEMS_QUERY($playlistId: String!) {
    youtubeItems(playlistId: $playlistId) {
      id
      title
      image
    }
  }
`;

function YoutubeItems(props) {
  const { loading, error, data } = useQuery(YOUTUBE_ITEMS_QUERY, {
    variables: { playlistId: props.playlistId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.youtubeItems.map(({ id, title, image }) => (
    <div key={id}>
      <p>{title}</p>
      <img src={image} />
    </div>
  ));
}
export default YoutubeItems;
