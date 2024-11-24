const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000 || process.env.PORT;

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Proxy for Geocode API
app.get('/maps/api/geocode/json/geocode', async (req, res) => {
  try {
    const address = req.query.address;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch geocode data' });
  }
});

// Proxy for Nearby Search API
app.get('maps/api/place/nearbysearch/json', async (req, res) => {
  try {
    const location = req.query.location;
    const radius = req.query.radius || 50000; 
    const type = req.query.type || 'tourist_attraction'; 
    
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nearby places data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});

