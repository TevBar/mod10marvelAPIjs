document.addEventListener('DOMContentLoaded', () => {
  const publicKey = '7970b2e25bb9ff24d40a3e091e77a80d';
  const privateKey = 'cf3a7569c0b7b21407003f2ed1299f2e0775d2ff';

  // Generate the hash for API authentication
  function generateHash() {
    const timestamp = new Date().getTime();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(CryptoJS.enc.Hex);
    return { timestamp, hash };
  }

  // Fetch Marvel characters from the API
  function fetchMarvelCharacters() {
    const { timestamp, hash } = generateHash();
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);

        if (!data.data || !data.data.results) {
          console.error('Unexpected API response structure:', data);
          return;
        }

        const charactersList = document.getElementById('charactersList');
        charactersList.innerHTML = ''; // Clear previous characters

        // Create a div for each character and add event listener for character selection
        data.data.results.forEach(character => {
          const div = document.createElement('div');
          div.classList.add('character-card');
          div.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
          `;
          
          // Click listener to load character details in the About section
          div.addEventListener('click', () => {
            showCharacterDetails(character);
          });

          charactersList.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }

  // Show character details in the "About" section
  function showCharacterDetails(character) {
    const aboutSection = document.getElementById('about-section');
    const characterDetails = document.getElementById('characterDetails');
    
    // Dynamically display the character's details in the About section
    characterDetails.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
      <p><strong>Description:</strong> ${character.description || 'No description available.'}</p>
      <p><strong>Comics Available:</strong> ${character.comics.available}</p>
      <p><strong>Series Available:</strong> ${character.series.available}</p>
      <p><strong>Stories Available:</strong> ${character.stories.available}</p>
    `;
    
    // Hide the Characters section and show the About section
    document.getElementById('marvel-section').style.display = 'none';
    aboutSection.style.display = 'block';
  }

  // Timer Logic
  let countdown;
  let timerDisplay = document.getElementById('timer-display');
  let timerInput = document.getElementById('timer-input');
  let startTimerButton = document.getElementById('start-timer');

  startTimerButton.addEventListener('click', () => {
    let timeInSeconds = parseInt(timerInput.value);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      alert('Please enter a valid number greater than 0');
      return;
    }

    countdown = setInterval(() => {
      if (timeInSeconds <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = 'Time’s up!';
      } else {
        timeInSeconds--;
        timerDisplay.textContent = `Timer: ${timeInSeconds} seconds`;
      }
    }, 1000);
  });

  // Event listener for "Characters" tab
  const charactersTab = document.getElementById('characters-tab');
  const marvelSection = document.getElementById('marvel-section');
  
  charactersTab.addEventListener('click', () => {
    // Hide the timer section
    document.getElementById('timer-section').style.display = 'none';
    
    // Show the marvel characters section
    marvelSection.style.display = 'block';
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('home-section').style.display = 'none';

    // Fetch characters from the Marvel API
    fetchMarvelCharacters();
  });

  // Event listener for "About" tab
  const aboutTab = document.getElementById('about-tab');
  
  aboutTab.addEventListener('click', () => {
    // Hide the timer section and show the "About" section
    document.getElementById('timer-section').style.display = 'none';
    document.getElementById('marvel-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'block';
    document.getElementById('home-section').style.display = 'none';
  });

  // Event listener for "Home" tab
  const homeTab = document.getElementById('home-tab');
  
  homeTab.addEventListener('click', () => {
    // Show the Home section and hide other sections
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('marvel-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('timer-section').style.display = 'block';
  });

  // Show the Home section by default on page load
  document.getElementById('home-section').style.display = 'block';
});
