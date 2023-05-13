//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container-div");

 /* level 100 */
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode-container");

  
  episodeList.forEach((episode) => {
 
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode");
    
    const HeadingName = document.createElement("h2");
    HeadingName.textContent = `${episode.name}-S0${episode.season}E0${episode.number}`;;

    const imageOfEpisode = document.createElement("img");
    imageOfEpisode.src = episode.image.medium;

   
    const descriptionOfEpisode = document.createElement("div");
    descriptionOfEpisode.innerHTML = episode.summary;

    episodeDiv.appendChild(HeadingName);
    episodeDiv.appendChild(imageOfEpisode);
    episodeDiv.appendChild(descriptionOfEpisode);

   
    episodeContainer.appendChild(episodeDiv);
  }); 

  
  /* level 250 */
  
  
  const searchDiv = document.createElement("div");
  searchDiv.classList.add("search-div");

  const matchCountSpan = document.createElement("span");
  matchCountSpan.textContent = `${episodeList.length} match(es)`;

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
      const episodeDiv = document.createElement("div");
      episodeDiv.classList.add("episode");

      const headingName = document.createElement("h2");
      headingName.textContent = `${episode.name}-S0${episode.season}E0${episode.number}`;

      const imageOfEpisode = document.createElement("img");
      imageOfEpisode.src = episode.image.medium;

      const descriptionOfEpisode = document.createElement("div");
      descriptionOfEpisode.innerHTML = episode.summary;

      episodeDiv.appendChild(headingName);
      episodeDiv.appendChild(imageOfEpisode);
      episodeDiv.appendChild(descriptionOfEpisode);

      searchContainer.appendChild(episodeDiv);
    });

    matchCountSpan.textContent = `${filteredEpisodes.length} match(es)`;
  });
  
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchContainer);
  searchDiv.appendChild(matchCountSpan);
  containerDiv.appendChild(searchDiv);
  containerDiv.appendChild(episodeContainer)
  
  rootElem.appendChild(containerDiv);


}










window.onload = setup;
