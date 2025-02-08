import mediaFactory from "../factories/mediaFactory.js";

async function getPhotographerData() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");

  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find((p) => p.id == photographerId);
    const media = data.media.filter((m) => m.photographerId == photographerId);

    if (!photographer || !media.length) {
      throw new Error("Aucun photographe ou média trouvé");
    }

    return { photographer, media };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return { photographer: null, media: [] };
  }
}

function displayPhotographerInfo(photographer, totalLikes) {
  const header = document.querySelector(".photograph-header");

  header.innerHTML = `
    <div class="photographer-info">
      <h1>${photographer.name}</h1>
      <p>${photographer.city}, ${photographer.country}</p>
      <p>${photographer.tagline}</p>
    </div>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" />
  `;

  // Ajouter la section fixe pour les likes et le tarif
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("fixed-stats");
  statsContainer.innerHTML = `
   <div class="stats-row">
      <div class="total-likes">
        <span id="total-likes">${totalLikes}</span> ❤️
      </div>
      <div class="price">
        <span>${photographer.price}€</span> / jour
      </div>
    </div>
  `;
  document.body.appendChild(statsContainer);
}

function displayMedia(mediaArray) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = ""; // On vide la section pour ajouter les médias

  mediaArray.forEach((mediaItem, index) => {
    const mediaModel = mediaFactory(mediaItem, mediaArray);
    const userCardDOM = mediaModel.getUserCardDOM(index);
    mediaSection.appendChild(userCardDOM);
  });
}

function sortMedia(mediaArray, criteria) {
  switch (criteria) {
    case "popularity":
      return mediaArray.sort((a, b) => b.likes - a.likes);
    case "date":
      return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "title":
      return mediaArray.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return mediaArray;
  }
}

async function init() {
  const { photographer, media } = await getPhotographerData();

  if (photographer && media) {
    const totalLikes = media.reduce((sum, item) => sum + item.likes, 0);
    displayPhotographerInfo(photographer, totalLikes);

    let sortedMedia = sortMedia(media, "popularity");
    displayMedia(sortedMedia);

    const sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", (event) => {
      sortedMedia = sortMedia(media, event.target.value);
      displayMedia(sortedMedia);
    });
  }
}

init();
