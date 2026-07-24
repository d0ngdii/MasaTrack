/*************************************************
 * MASATRACK
 * Wizard Controller
 *************************************************/

let currentStep = 1;

const totalSteps = 6;

const wizard = document.getElementById("applicationWizard");

const applyBtn = document.getElementById("applyBtn");

const heroApply = document.getElementById("heroApply");

applyBtn.addEventListener("click", openWizard);

heroApply.addEventListener("click", openWizard);

function openWizard() {
  wizard.classList.remove("hidden");

  wizard.scrollIntoView({
    behavior: "smooth",
  });
}

function showStep(step) {
  document
    .querySelectorAll(".step")
    .forEach((s) => s.classList.remove("active"));

  document.getElementById("step" + step).classList.add("active");

  updateStepper();
}

function nextStep() {
  if (currentStep >= totalSteps) return;

  currentStep++;

  showStep(currentStep);

  if (currentStep === 6) {
    generateReview();
  }
}

function previousStep() {
  if (currentStep <= 1) return;

  currentStep--;

  showStep(currentStep);
}

function updateStepper() {
  const items = document.querySelectorAll(".step-item");

  items.forEach((item, index) => {
    item.classList.remove("active", "completed");

    if (index + 1 < currentStep) {
      item.classList.add("completed");

      item.querySelector(".circle").innerHTML = "✓";
    } else {
      item.querySelector(".circle").innerHTML = index + 1;
    }

    if (index + 1 === currentStep) {
      item.classList.add("active");
    }
  });
}
