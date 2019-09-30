import React, { useState } from 'react';
import './App.css';
import YoutubeForm from '../src/components/YoutubeForm';
import YoutubeList from '../src/components/YoutubeList';

function App() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [playlistId, setPlaylistId] = useState('');

  return (
    <div className="App">
      <YoutubeForm
        setIsListVisible={setIsListVisible}
        isListVisible={isListVisible}
        setPlaylistId={setPlaylistId}
      />
      {isListVisible ? <YoutubeList playlistId={playlistId} /> : ''}
    </div>
  );
}

export default App;
