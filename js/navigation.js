const menuButton = document.getElementById("menuToggle");

const navigation = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("active");
});

document.querySelectorAll("#mainNav a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
  });
});
