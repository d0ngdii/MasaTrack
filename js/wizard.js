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
  const saved = loadApplication();

  if (saved) {
    const hasData = [
      saved.firstName,
      saved.lastName,
      saved.contactNumber,
      saved.email,
      saved.birthDate,
      saved.address,
    ].some((value) => value && value.toString().trim() !== "");

    if (hasData) {
      resumeModal.classList.remove("hidden");
      return;
    }
  }

  wizard.classList.remove("hidden");

  wizard.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function showStep(step) {
  document
    .querySelectorAll(".step")
    .forEach((s) => s.classList.remove("active"));

  document.getElementById("step" + step).classList.add("active");

  updateStepper();
  updateMobileProgress();
}

function nextStep() {
  if (currentStep >= totalSteps) return;

  if (!validateStep(currentStep)) {
    return;
  }

  currentStep++;

  autoSaveApplication();

  showStep(currentStep);

  if (currentStep === 6) {
    generateReview();
  }

  document.getElementById("applicationWizard").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function previousStep() {
  if (currentStep <= 1) return;

  currentStep--;
  autoSaveApplication();

  showStep(currentStep);

  document.getElementById("applicationWizard").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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

function updateMobileProgress() {
  const titles = [
    "Personal",

    "Emergency",

    "Medical",

    "Group",

    "Schedule",

    "Review",
  ];

  document.getElementById("mobileStepNumber").textContent =
    `Step ${currentStep} of 6`;

  document.getElementById("mobileStepTitle").textContent =
    titles[currentStep - 1];

  document.getElementById("mobileProgressFill").style.width =
    (currentStep / 6) * 100 + "%";
}
