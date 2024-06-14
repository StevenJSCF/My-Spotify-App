'use client';

import { useState } from 'react';
import axios from 'axios';

const Artist = () => {
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artistId, setArtistId] = useState('');

  const fetchArtist = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/artist/${artistId}`);
      setArtist(response.data);
    } catch (err) {
      console.log("Failed to fetch artist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter Artist ID" 
        value={artistId}
        onChange={(e) => setArtistId(e.target.value)}
      />
      <button onClick={fetchArtist}>Get Artist</button>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {artist && (
        <div>
            <p>{artist.genres[0]}</p>
          <h1>{artist.name}</h1>
          <p>followers: {artist.followers.total}</p>
          {artist.images && artist.images.length > 0 && (
            <img src={artist.images[0].url} alt={artist.name} width="200" />
          )}
        </div>
      )}
    </div>
  );
};

export default Artist;
