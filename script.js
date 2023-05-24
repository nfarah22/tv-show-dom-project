//Your codelet 
function setup() {
  fetchShows();
}
// fetchs the list of shows from the API and lists them alphabetcially. 
// tried to make GOT the default show that the page loads to but it it just returns error.
function fetchShows() {
  const url = 'https://api.tvmaze.com/shows';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const alphabeticalOrder = data.sort((a, b) => a.name.localeCompare(b.name));
      makePageForShows(alphabeticalOrder);
    })
    .catch((error) => console.log(error));
}
// makes the page for selecting a tv shows
function makePageForShows(shows) {
  const rootElem = document.getElementById('root');
  rootElem.innerHTML = '';
  
  const selectShow = document.createElement('select');
  selectShow.id = 'select-show';
  const labelShow = document.createElement('label');
  labelShow.textContent = 'Select a show: ';
//  iterates over the shows array and creates an option element for each show. 
 shows.forEach((show) => {
    const option = document.createElement('option');
    option.value = show.id;
    option.textContent = show.name;
    selectShow.appendChild(option);
  });

  // event listener for when a show is selected by user
  selectShow.addEventListener('change', (event) => {
    const showId = event.target.value;
    fetchEpisodes(showId);
  });

  rootElem.appendChild(labelShow);
  rootElem.appendChild(selectShow);
}
// fetches episodes for the selected show by making an API request 
function fetchEpisodes(showId) {
  const url = `https://api.tvmaze.com/shows/${showId}/episodes`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data))
    .catch((error) => console.log(error));
}

// holds episode elements 
const episodeContainer = document.createElement("div");
episodeContainer.classList.add("episode-container");
// provides the page that lists episodes
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const main = document.querySelector('main');
 // Create main element if it doesn't exist
  if (!main) {
    const main = document.createElement('main');
    main.classList.add('_main');
    rootElem.appendChild(main);
  }

  
  episodeContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeDiv = createEpisodeElement(episode);
    episodeContainer.appendChild(episodeDiv);
  });

  const searchBarDiv = searchBar(episodeList);
  const selectEpisodeDiv = selectEpisode(episodeList);

  main.innerHTML = ""; 
  main.appendChild(searchBarDiv);
  main.appendChild(selectEpisodeDiv);
  main.appendChild(episodeContainer);

  rootElem.appendChild(main);
}
// search bar for filtering episodes
function searchBar(episodeList) {
  const searchDiv = document.createElement("div");
  searchDiv.classList.add("search-div");

  const matchingDisplay = document.createElement("span");
  matchingDisplay.textContent = `${episodeList.length} Episodes`;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search episodes...";

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
    );

    searchContainer.innerHTML = "";
    filteredEpisodes.forEach((episode) => {
      const episodeDiv = createEpisodeElement(episode);
      searchContainer.appendChild(episodeDiv);
    });

    matchingDisplay.textContent = `Displaying ${filteredEpisodes.length} Episodes / ${episodeList.length}`;
  });

  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchContainer);
  searchDiv.appendChild(matchingDisplay);

  return searchDiv;
}
// select epsiodes from a dropdown menu
function selectEpisode(episodeList) {
  const selectDiv = document.createElement("div");
  selectDiv.classList.add("select-div");
  const labelEpisode = document.createElement("label");
  labelEpisode.textContent = "Select an episode: ";

  const selectContainer = document.createElement("div");

  const selectInput = document.createElement("select");
  episodeList.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    const seasonNumber = `S${episode.season.toString().padStart(2, '0')}`;
    const episodeNumber = `E${episode.number.toString().padStart(2, '0')}`;
    option.textContent = `${seasonNumber}${episodeNumber} - ${episode.name}`;
    selectInput.appendChild(option);
  });

  selectInput.addEventListener("change", (event) => {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex >= 0) {
      const selectedOption = event.target.options[selectedIndex];
      const selectedEpisode = episodeList.find(episode => episode.id == selectedOption.value);
      if (selectedEpisode) {
        const rootElem = document.getElementById("root");
        rootElem.innerHTML = "";

        const backButton = document.createElement("button");
        backButton.textContent = "Back to All Episodes";
        backButton.addEventListener("click", () => {
          setup();
        });

        const selectedEpisodeDiv = createEpisodeElement(selectedEpisode);

        rootElem.appendChild(backButton);
        rootElem.appendChild(selectedEpisodeDiv);
      }
    } else {
      setup();
    }
  });

  selectContainer.appendChild(labelEpisode);
  selectContainer.appendChild(selectInput);
  selectDiv.appendChild(selectContainer);

  return selectDiv;
}

function createEpisodeElement(episode) {
  const episodeDiv = document.createElement("div");
  episodeDiv.classList.add("episode");

  const headingName = document.createElement("h2");
  const season = `S${episode.season.toString().padStart(2, '0')}`;
  const number = `E${episode.number.toString().padStart(2, '0')}`;
  headingName.textContent = `${episode.name} - ${season}${number}`;

  const imageOfEpisode = document.createElement("img");
  imageOfEpisode.src = episode.image.medium;

  const descriptionOfEpisode = document.createElement("div");
  descriptionOfEpisode.innerHTML = episode.summary;

  episodeDiv.appendChild(headingName);
  episodeDiv.appendChild(imageOfEpisode);
  episodeDiv.appendChild(descriptionOfEpisode);

  return episodeDiv;
}

window.onload = setup;
