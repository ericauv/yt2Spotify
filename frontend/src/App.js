import React from 'react';
import './App.css';
import YoutubeForm from '../src/components/YoutubeForm';
import YoutubeList from '../src/components/YoutubeList';

function App() {
  return (
    <div className="App">
      {/* <YoutubeForm /> */}
      <YoutubeList playlistId="PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" />
    </div>
  );
}

export default App;
