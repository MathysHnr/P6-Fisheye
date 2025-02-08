function displayModal() {
  if (document.getElementById("contact_modal")) {
    return;
  }

  const modal = document.createElement("div");
  modal.id = "contact_modal";

  const photographerName =
    document.querySelector(".photographer-info h1")?.textContent ||
    "Photographe";

  modal.innerHTML = `
    <div class="modal">
      <div class="title-wrapper">
        <h2 style="font-size: 64px; margin: 0; margin-bottom: 20px;">Contactez-moi</h2>
        <h3 style="font-size: 64px; margin: 0; font-weight: normal;">${photographerName}</h3>
      </div>
      <img 
        src="assets/icons/close.svg" 
        onclick="closeModal()" 
        aria-label="Close dialog"
        style="position: absolute; top: 35px; right: 35px; cursor: pointer; width: 42px; height: 42px;"
      />
      
      <form style="margin-top: 20px; width: 100%;">
        <div>
          <label for="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
          />
        </div>
        <div>
          <label for="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div style="width: 100%;">
          <label for="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            required
            style="width: 100%; height: 170px; resize: none; box-sizing: border-box;"
          ></textarea>
        </div>
        <button class="contact_button" type="submit" style="margin-top: 20px;">
          Envoyer
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "flex";

  // Style supplémentaire pour la modale
  const modalDiv = modal.querySelector(".modal");
  Object.assign(modalDiv.style, {
    backgroundColor: "#db8876",
    borderRadius: "5px",
    width: "50%",
    maxWidth: "669px",
    padding: "35px",
    position: "relative",
  });

  // Style pour le conteneur global
  Object.assign(modal.style, {
    position: "fixed",
    zIndex: "1",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(196, 196, 196, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  // Style pour tous les inputs et textarea
  const inputs = modal.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    Object.assign(input.style, {
      width: "100%",
      boxSizing: "border-box",
    });
  });

  // Responsive styles
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  if (mediaQuery.matches) {
    modalDiv.style.width = "85%";
    modalDiv.style.padding = "15px";
  }

  // Prevent body scrolling
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

window.displayModal = displayModal;
window.closeModal = closeModal;

document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.querySelector(".contact_button");
  if (contactButton) {
    contactButton.addEventListener("click", displayModal);
  }
});

// Close modal when clicking outside
document.addEventListener("click", (event) => {
  const modal = document.getElementById("contact_modal");
  if (modal && event.target === modal) {
    closeModal();
  }
});

// Prevent closing when clicking inside modal
document.addEventListener("click", (event) => {
  if (event.target.closest(".modal")) {
    event.stopPropagation();
  }
});
