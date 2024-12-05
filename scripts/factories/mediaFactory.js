function mediaFactory(data) {
  const { title, name, image, video, likes, date } = data;

  function getMediaElement() {
    const mediaElement = document.createElement(image ? "img" : "video");

    if (image) {
      mediaElement.src = `assets/images/${image}`;
      mediaElement.alt = title;
    } else if (video) {
      mediaElement.src = `assets/images/${video}`;
      mediaElement.controls = true;
    }

    return mediaElement;
  }

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-card");

    const mediaElement = getMediaElement();

    const mediaInfoDiv = document.createElement("div");
    mediaInfoDiv.classList.add("media-info");

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const likesElement = document.createElement("span");
    likesElement.classList.add("media-likes");
    likesElement.textContent = likes;

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.textContent = "❤️";

    mediaInfoDiv.appendChild(titleElement);
    mediaInfoDiv.appendChild(likesElement);
    mediaInfoDiv.appendChild(likeButton);

    article.appendChild(mediaElement);
    article.appendChild(mediaInfoDiv);

    article.querySelector("img, video").addEventListener("click", () => {
      // Fonction pour ouvrir la lightbox
      openLightbox(data);
    });

    likeButton.addEventListener("click", () => {
      data.likes++;
      likesElement.innerText = data.likes;
    });

    return article;
  }

  return { title, getUserCardDOM };
}
