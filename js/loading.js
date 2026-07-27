function showLoading(title, message) {
  const overlay = document.getElementById("loadingOverlay");
  const loadingTitle = document.getElementById("loadingTitle");
  const loadingMessage = document.getElementById("loadingMessage");

  if (!overlay) {
    console.error("loadingOverlay not found.");
    return;
  }

  loadingTitle.textContent = title;
  loadingMessage.textContent = message;

  overlay.classList.remove("hidden");
}

function hideLoading() {
  const overlay = document.getElementById("loadingOverlay");

  if (!overlay) return;

  overlay.classList.add("hidden");
}
