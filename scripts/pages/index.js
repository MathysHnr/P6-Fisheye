import photographerTemplate from "../templates/photographer.js";

async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return { photographers: data.photographers };
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes :", error);
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
