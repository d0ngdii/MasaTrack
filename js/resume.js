const resumeModal = document.getElementById("resumeModal");

function checkSavedApplication() {
  const saved = loadApplication();

  if (!saved) return;

  const hasData = [
    saved.firstName,
    saved.lastName,
    saved.contactNumber,
    saved.email,
    saved.birthDate,
    saved.address,
  ].some((value) => value && value.toString().trim() !== "");

  if (!hasData) {
    return;
  }

  const applicantName = saved.firstName || "Applicant";

  const hour = new Date().getHours();

  let greeting = "Welcome back";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  document.getElementById("resumeTitle").textContent =
    `${greeting}, ${applicantName}!`;

  document.getElementById("lastSavedTime").textContent = new Date(
    saved.lastSaved,
  ).toLocaleString();

  const step = saved.currentStep || 1;

  document.getElementById("progressText").textContent =
    `Step ${step} of ${totalSteps}`;

  document.getElementById("resumeProgressFill").style.width =
    (step / totalSteps) * 100 + "%";

  resumeModal.classList.remove("hidden");
}

document
  .getElementById("continueApplicationBtn")
  .addEventListener("click", () => {
    restoreApplication();

    resumeModal.classList.add("hidden");

    const wizard = document.getElementById("applicationWizard");

    wizard.classList.remove("hidden");

    wizard.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

document.getElementById("newApplicationBtn").addEventListener("click", () => {
  clearApplication();

  resumeModal.classList.add("hidden");

  const wizard = document.getElementById("applicationWizard");

  wizard.classList.remove("hidden");

  currentStep = 1;

  showStep(1);

  wizard.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// document.addEventListener("DOMContentLoaded", checkSavedApplication);
