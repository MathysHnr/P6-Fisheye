class Media {
  constructor(data) {
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
  }

  getMediaElement() {
    throw new Error(
      "getMediaElement doit être implémentée dans les sous-classes."
    );
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-card");

    const mediaElement = this.getMediaElement();
    mediaElement.addEventListener("click", () => {
      const mediaIndex = mediaList.findIndex((m) => m.id === data.id);
      openLightbox(mediaIndex, mediaList);
    });

    const mediaInfoDiv = document.createElement("div");
    mediaInfoDiv.classList.add("media-info");

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.title;

    const likesElement = document.createElement("span");
    likesElement.classList.add("media-likes");
    likesElement.textContent = this.likes;

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.textContent = "❤️";

    mediaInfoDiv.append(titleElement, likesElement, likeButton);
    article.append(mediaElement, mediaInfoDiv);

    likeButton.addEventListener("click", () => {
      this.likes++;
      likesElement.textContent = this.likes;
    });

    return article;
  }
}

class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  getMediaElement() {
    const img = document.createElement("img");
    img.src = `assets/images/${this.image}`;
    img.alt = this.title;
    return img;
  }
}

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  getMediaElement() {
    const video = document.createElement("video");
    video.src = `assets/images/${this.video}`;
    video.controls = true;
    return video;
  }
}

function mediaFactory(data, mediaArray) {
  let mediaItem;

  if (data.image) {
    mediaItem = new ImageMedia(data);
  } else if (data.video) {
    mediaItem = new VideoMedia(data);
  } else {
    throw new Error("Type de média non supporté.");
  }

  mediaItem.getUserCardDOM = function (index) {
    const article = document.createElement("article");
    article.classList.add("media-card");

    const mediaElement = this.getMediaElement();
    mediaElement.addEventListener("click", () => {
      openLightbox(index, mediaArray); // ✅ On passe maintenant le bon `index` et `mediaArray`
    });

    const mediaInfoDiv = document.createElement("div");
    mediaInfoDiv.classList.add("media-info");

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.title;

    const likesElement = document.createElement("span");
    likesElement.classList.add("media-likes");
    likesElement.textContent = this.likes;

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.textContent = "❤️";

    mediaInfoDiv.append(titleElement, likesElement, likeButton);
    article.append(mediaElement, mediaInfoDiv);

    likeButton.addEventListener("click", () => {
      this.likes++;
      likesElement.textContent = this.likes;
    });

    return article;
  };

  return mediaItem;
}

export default mediaFactory;
