const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Use node-fetch to handle API requests on the server side

const app = express();
const port = 3000;

// Enable CORS for local development (if needed)
app.use(cors());

// Serve static files from 'public' folder
app.use(express.static('public'));

// Endpoint for Marvel API fetch
app.get('/api/marvel', async (req, res) => {
  const publicKey = '7970b2e25bb9ff24d40a3e091e77a80d';
  const privateKey = 'cf3a7569c0b7b21407003f2ed1299f2e0775d2ff';
  const timestamp = new Date().getTime();
  const hash = require('crypto').createHash('md5').update(timestamp + privateKey + publicKey).digest('hex');

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Send the data back to the client
  } catch (error) {
    res.status(500).send('Error fetching Marvel characters');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
