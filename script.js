//You can edit ALL of the code here
function setup() {
  const showId = 82; 
  fetchEpisodes(showId);
}

function fetchEpisodes(showId) {
  const url = `https://api.tvmaze.com/shows/${showId}/episodes`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data))
    .catch((error) => console.log(error));
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  
  const main = document.createElement("main");
  main.classList.add("_main");

 /* level 100 */
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode-container");

  episodeList.forEach((episode) => {
    const episodeDiv = createEpisodeElement(episode);
    episodeContainer.appendChild(episodeDiv);
  });

  selectEpisode(episodeList, main, episodeContainer);
  
  /* level 200 */
  
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

    matchingDisplay.textContent = `${filteredEpisodes.length} Episodes`; // 
  });
  
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchContainer);
  searchDiv.appendChild(matchingDisplay);
  main.appendChild(searchDiv);
  main.appendChild(episodeContainer)
  
  rootElem.appendChild(main);
}

function selectEpisode(episodeList, main,episodeContainer){
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
    const selectedIndex = event.target.value;
    if (selectedIndex >= 0) {
      const selectedEpisode = episodeList[selectedIndex];
      loadSelectedEpisode(selectedEpisode, main);
    } else {
      setup();
    }
  });
  
  main.appendChild(selectInput);
  main.appendChild(episodeContainer);
};

function loadSelectedEpisode(selectedEpisode,main ) {
  main.innerHTML = "";
  
  const selectedEpisodeDiv = createEpisodeElement(selectedEpisode);
  main.appendChild(backButton);
  main.appendChild(selectedEpisodeDiv);
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
