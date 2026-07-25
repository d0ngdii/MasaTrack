const overlay = document.getElementById("loadingOverlay");

const loadingTitle = document.getElementById("loadingTitle");
const loadingMessage = document.getElementById("loadingMessage");

function showLoading(title, message) {
  if (!overlay) {
    console.error("loadingOverlay not found.");
    return;
  }

  loadingTitle.textContent = title;
  loadingMessage.textContent = message;

  overlay.classList.remove("hidden");
}

function hideLoading() {
  if (!overlay) return;

  overlay.classList.add("hidden");
}
