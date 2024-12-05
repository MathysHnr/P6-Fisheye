function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Assurez-vous que le bouton "Contactez-moi" appelle displayModal()
document
  .querySelector(".contact_button")
  .addEventListener("click", displayModal);

// Et que le bouton de fermeture du modal appelle closeModal()
document
  .querySelector(".modal header img")
  .addEventListener("click", closeModal);
