let currentIndex = 0;
let mediaArray = [];

function openLightbox(mediaItem) {
  // S'assurer que mediaArray est initialisé avec le bon tableau de médias
  if (!window.media || window.media.length === 0) {
    console.error("window.media n'est pas initialisé!");
    return;
  }

  mediaArray = [...window.media]; // Faire une copie du tableau
  console.log("mediaArray après initialisation:", mediaArray);

  // Trouver l'index du média actuel
  currentIndex = mediaArray.findIndex((item) => item.id === mediaItem.id);
  console.log(currentIndex);

  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "block";

  const content = mediaItem.image
    ? document.createElement("img")
    : document.createElement("video");

  content.src = mediaItem.image
    ? `assets/images/${mediaItem.image}`
    : `assets/images/${mediaItem.video}`;
  content.alt = mediaItem.title;

  const lightboxContent = document.createElement("div");
  lightboxContent.classList.add("lightbox-content");
  lightboxContent.appendChild(content);

  const titleElement = document.createElement("h2");
  titleElement.textContent = mediaItem.title;

  const closeButton = document.createElement("span");
  closeButton.classList.add("close");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", closeLightbox);

  const prevButton = document.createElement("button");
  prevButton.classList.add("prev");
  prevButton.textContent = "<";
  prevButton.addEventListener("click", prevMedia);

  const nextButton = document.createElement("button");
  nextButton.classList.add("next");
  nextButton.textContent = ">";
  nextButton.addEventListener("click", nextMedia);

  const counter = document.createElement("div");
  counter.classList.add("counter");
  counter.textContent = `${currentIndex + 1} / ${mediaArray.length}`;

  lightbox.innerHTML = ""; // Clear previous content
  lightbox.appendChild(prevButton);
  lightbox.appendChild(lightboxContent);
  lightbox.appendChild(titleElement);
  lightbox.appendChild(nextButton);
  lightbox.appendChild(closeButton);
  lightbox.appendChild(counter);
}

function updateLightboxContent(index) {
  // Vérifiez si l'index est valide
  if (index < 0 || index >= mediaArray.length) {
    console.error("Index invalide:", index);
    return;
  }

  const currentMedia = mediaArray[index];
  currentIndex = index; // Mettre à jour l'index courant

  // Vérifiez si currentMedia est défini
  if (!currentMedia) {
    console.error("Aucun média trouvé à l'index:", index);
    return;
  }

  const mediaPath = `assets/images/${currentMedia.image || currentMedia.video}`;
  const content = currentMedia.image
    ? `<img src="${mediaPath}" alt="${currentMedia.title}" class="lightbox-content">`
    : `<video src="${mediaPath}" controls class="lightbox-content"></video>`;

  const lightbox = document.getElementById("lightbox_modal");
  lightbox.innerHTML = `
    <button class="prev" onclick="prevMedia()">&lt;</button>
    ${content}
    <h2>${currentMedia.title}</h2>
    <button class="next" onclick="nextMedia()">&gt;</button>
    <span class="close" onclick="closeLightbox()">&times;</span>
    <div class="counter">${index + 1} / ${mediaArray.length}</div>
  `;
}

function prevMedia() {
  const newIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length;
  updateLightboxContent(newIndex);
}

function nextMedia() {
  const newIndex = (currentIndex + 1) % mediaArray.length;
  updateLightboxContent(newIndex);
}

function closeLightbox() {
  document.getElementById("lightbox_modal").style.display = "none";
}

function handleKeydown(event) {
  if (event.key === "ArrowLeft") {
    prevMedia();
  } else if (event.key === "ArrowRight") {
    nextMedia();
  } else if (event.key === "Escape") {
    closeLightbox();
  }
}

// Exposer la fonction openLightbox globalement
window.openLightbox = openLightbox;
