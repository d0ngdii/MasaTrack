const toastContainer = document.getElementById("toastContainer");

function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOut .3s forwards";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
