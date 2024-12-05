//Mettre le code JavaScript lié à la page photographer.html

let photographer;
let media;

// Au début du fichier
if (typeof photographerTemplate !== "function") {
  console.error("photographerTemplate is not defined as a function");
}

// Fonction pour récupérer les données du photographe et ses médias
async function getPhotographerData() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");

  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();

    const photographer = data.photographers.find((p) => p.id == photographerId);
    const media = data.media.filter((m) => m.photographerId == photographerId);

    console.log("Photographer:", photographer);
    console.log("Media:", media);

    if (!photographer || !media.length) {
      throw new Error("No photographer or media data found");
    }

    return { photographer, media };
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return { photographer: null, media: [] };
  }
}

// Fonction pour afficher les données du photographe
function displayPhotographerInfo(photographer) {
  if (typeof window.photographerTemplate === "function") {
    const template = window.photographerTemplate(photographer);
    const header = document.querySelector(".photograph-header");
    header.innerHTML = `
      <div class="photographer-info">
        <h1>${template.name}</h1>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
      </div>
      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
      <img src="${template.picture}" alt="${template.name}" />
    `;
  } else {
    console.error("photographerTemplate is not a function");
  }
}

// Fonction pour afficher les médias du photographe
function createMediaCard(mediaItem, photographerName) {
  const card = document.createElement("div");
  card.classList.add("media-card");

  const mediaPath = `assets/images/${mediaItem.image || mediaItem.video}`;
  const mediaElement = mediaItem.image
    ? `<img src="${mediaPath}" alt="${mediaItem.title}">`
    : `<video src="${mediaPath}" alt="${mediaItem.title}"></video>`;

  card.innerHTML = `
    ${mediaElement}
    <div class="media-info">
      <h2 class="media-title">${mediaItem.title}</h2>
      <span class="media-likes">${mediaItem.likes}</span>
      <button class="like-button">❤️</button>
    </div>
  `;

  card.querySelector("img, video").addEventListener("click", () => {
    console.log("Opening lightbox for media ID:", mediaItem.id);
    openLightbox(mediaItem, photographerName);
  });

  card.querySelector(".like-button").addEventListener("click", () => {
    mediaItem.likes++;
    card.querySelector(".media-likes").innerText = mediaItem.likes;
  });

  return card;
}

function displayMedia(mediaArray) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = "";
  mediaArray.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const userCardDOM = mediaModel.getUserCardDOM();
    mediaSection.appendChild(userCardDOM);
  });
}

function sortMedia() {
  const sortSelect = document.getElementById("sort-select");
  const sortBy = sortSelect.value;

  media.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return b.likes - a.likes;
    }
  });

  // Mettre à jour window.media avec le nouveau tri
  window.media = [...media];

  displayMedia(media);
}

// Fonction d'initialisation
async function init() {
  try {
    const data = await getPhotographerData();
    photographer = data.photographer;
    media = data.media;
    console.log("Photographer:", photographer);
    console.log("Media:", media);

    // Initialiser window.media ici
    window.media = [...media];

    if (photographer && media) {
      displayPhotographerInfo(photographer);

      // Calculer le total des likes
      const totalLikes = media.reduce(
        (sum, mediaItem) => sum + mediaItem.likes,
        0
      );

      // Trier les médias par popularité avant de les afficher
      media.sort((a, b) => b.likes - a.likes);

      displayMedia(media);
      displayPriceTag(photographer.price, totalLikes);

      document
        .getElementById("sort-select")
        .addEventListener("change", sortMedia);
    } else {
      console.error("No photographer or media data");
    }
  } catch (error) {
    console.error("Error in init function:", error);
  }
}

init();

function openLightbox(mediaItem, photographerName) {
  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "block";

  const mediaPath = `assets/images/${photographerName}/${
    mediaItem.image || mediaItem.video
  }`;
  const content = mediaItem.image
    ? `<img src="${mediaPath}" alt="${mediaItem.title}" class="lightbox-content">`
    : `<video src="${mediaPath}" controls class="lightbox-content"></video>`;

  lightbox.innerHTML = `
    ${content}
    <span class="close" onclick="closeLightbox()">&times;</span>
  `;
}

function displayPriceTag(price, totalLikes) {
  const main = document.getElementById("main");
  const priceTag = document.createElement("div");
  priceTag.classList.add("price-tag");
  priceTag.innerHTML = `${totalLikes} ❤️ ${price}€ / jour`;
  main.appendChild(priceTag);
}

// Rendre media accessible globalement
window.media = media;
