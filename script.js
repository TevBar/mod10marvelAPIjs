document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '7970b2e25bb9ff24d40a3e091e77a80d';
    const timestamp = '1737744887924';
    const hash = 'b5f4619293837e2b51f3e17878b50bff';
    
    const url = `https://gateway.marvel.com/v1/public/characters?ts=1737744887924&apikey=7970b2e25bb9ff24d40a3e091e77a80d&hash=b5f4619293837e2b51f3e17878b50bff`;
  
    function fetchMarvelCharacters() {
        fetch(url)
          .then(response => {
            // Check if the response is ok (status 200)
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('API Response:', data); // Log full response for debugging
    
            // Check if `data.data.results` exists
            if (!data.data || !data.data.results) {
              console.error('Unexpected API response structure:', data);
              return;
            }
    
            const charactersList = document.getElementById('charactersList');
    
            // Ensure `charactersList` exists
            if (!charactersList) {
              console.error('Error: #charactersList element not found in the DOM.');
              return;
            }
    
            charactersList.innerHTML = ''; // Clear previous characters
    
            // Render characters
            data.data.results.forEach(character => {
              const div = document.createElement('div');
              div.innerHTML = `
                <h3>${character.name}</h3>
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
              `;
              charactersList.appendChild(div);
            });
          })
          .catch(error => {
            console.error('Error fetching characters:', error);
          });
      }
    
      // Call the function to fetch and display Marvel characters
      fetchMarvelCharacters();
    });







// Timestamp: 1737744887924
// Hash: b5f4619293837e2b51f3e17878b50bff

// const url = `https://gateway.marvel.com/v1/public/characters?ts=1737744887924&apikey=7970b2e25bb9ff24d40a3e091e77a80d&hash=b5f4619293837e2b51f3e17878b50bff`;