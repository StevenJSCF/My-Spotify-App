import axios from 'axios';

const CLIENT_ID = process.env.SPOTIPY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIPY_CLIENT_SECRET;

const getToken = async () => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  };

  try {
    const response = await axios(authOptions);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw new Error('Failed to get Spotify token');
  }
};

const getArtistData = async (artistId: string) => {
  const token = await getToken();
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

export { getArtistData };