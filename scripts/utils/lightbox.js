let currentIndex = 0;
let mediaList = []; // Liste des médias

// Fonction pour ouvrir la lightbox
function openLightbox(index, mediaArray) {
  mediaList = mediaArray; // Charge la liste des médias
  currentIndex = index; // Définit l'index actuel

  const lightbox = document.getElementById("lightbox_modal");
  if (!lightbox) {
    console.error("L'élément #lightbox_modal est introuvable.");
    return;
  }

  lightbox.style.display = "flex"; // Affiche la lightbox
  updateLightboxContent(); // Met à jour le contenu de la lightbox
  document.addEventListener("keydown", handleKeydown); // Ajoute la navigation clavier
}

function updateLightboxContent() {
  const container = document.querySelector(".lightbox-content-container");
  container.innerHTML = ""; // Nettoie le contenu précédent

  const mediaItem = mediaList[currentIndex]; // Récupère le média actuel
  let content;

  // Génère dynamiquement le contenu (image ou vidéo)
  if (mediaItem.image) {
    content = document.createElement("img");
    content.src = `assets/images/${mediaItem.image}`;
    content.alt = mediaItem.title;
  } else if (mediaItem.video) {
    content = document.createElement("video");
    content.src = `assets/images/${mediaItem.video}`;
    content.controls = true;
  }

  content.classList.add("lightbox-content");

  // Génère dynamiquement le titre
  const title = document.createElement("h2");
  title.textContent = mediaItem.title; // Titre récupéré depuis mediaList
  title.classList.add("lightbox-title");

  // Ajoutez le contenu et le titre au conteneur
  container.appendChild(content);
  container.appendChild(title);

  // Bouton de fermeture
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("lightbox-close");
  closeButton.addEventListener("click", closeLightbox);

  // Flèche gauche
  const leftArrow = document.createElement("button");
  leftArrow.innerHTML = "&#9665;";
  leftArrow.classList.add("lightbox-arrow", "left-arrow");
  leftArrow.addEventListener("click", showPreviousMedia);

  // Flèche droite
  const rightArrow = document.createElement("button");
  rightArrow.innerHTML = "&#9655;";
  rightArrow.classList.add("lightbox-arrow", "right-arrow");
  rightArrow.addEventListener("click", showNextMedia);

  // Ajoutez les éléments au conteneur
  container.appendChild(closeButton);
  container.appendChild(leftArrow);
  container.appendChild(rightArrow);
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox_modal");
  if (lightbox) {
    lightbox.style.display = "none"; // Masque la lightbox
  }
  document.removeEventListener("keydown", handleKeydown); // Retire l'écouteur clavier
}

// Fonction pour afficher le média précédent
function showPreviousMedia() {
  if (currentIndex > 0) {
    currentIndex--;
    updateLightboxContent();
  }
}

// Fonction pour afficher le média suivant
function showNextMedia() {
  if (currentIndex < mediaList.length - 1) {
    currentIndex++;
    updateLightboxContent();
  }
}

// Fonction pour gérer les touches du clavier
function handleKeydown(event) {
  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showPreviousMedia();
  } else if (event.key === "ArrowRight") {
    showNextMedia();
  }
}

// Expose les fonctions globalement
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
