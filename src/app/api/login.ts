import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const CLIENT_ID = process.env.SPOTIPY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIPY_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: "Missing Spotify credentials" });
  }

  const authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET,
  };

  try {
    const response = await axios(authOptions);
    const { access_token, token_type, expires_in } = response.data;

    console.log(response.data)

    return res.status(200).json({
      access_token,
      token_type,
      expires_in,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.response?.data || "An error occurred",
    });
  }
}
