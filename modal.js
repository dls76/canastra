const feedbackBtn = document.querySelector(".feedback-btn");
const modal = document.querySelector(".modal");
const canastra = document.querySelector(".canastra");

feedbackBtn.addEventListener("click", () => {
    canastra.style.display = "none";
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 0);
});

modal.querySelector(".close").addEventListener("click", () => {
  hideModal();
});

modal.querySelector(".cancel").addEventListener("click", () => {
  hideModal();
});

document.addEventListener("click", (e) => {
  if (!e.composedPath().includes(modal)) {
    hideModal();
  }
});

modal.addEventListener("transitionend", function (e) {
  if (!this.classList.contains("show")) {
    if (e.propertyName == "transform") {
      this.style.display = "";
    }
  }
});

function hideModal() {
    // if (players.length >= 2) {
    //     feedbackBtn.style.display = "none"
    //     modal.classList.remove("show");
    // } else {
    //     alert('Adicione pelo menos dois jogadores ou duplas.')
    // }
        modal.classList.remove("show");
}
