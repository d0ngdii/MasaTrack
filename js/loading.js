const overlay = document.getElementById("loadingOverlay");

function showLoading(title, message) {
  loadingTitle.textContent = title;

  loadingMessage.textContent = message;

  overlay.classList.remove("hidden");
}

function hideLoading() {
  overlay.classList.add("hidden");
}
