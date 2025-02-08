function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.href = `photographer.html?id=${id}`;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.className = "location";

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.className = "tagline";

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    priceElement.className = "price";

    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }

  return { name, picture, getUserCardDOM };
}

export default photographerTemplate;
