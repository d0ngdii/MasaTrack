const birthDate = document.getElementById("birthDate");

const age = document.getElementById("age");

birthDate.addEventListener("change", () => {
  const dob = new Date(birthDate.value);

  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();

  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    years--;
  }

  age.value = years;
});

document.getElementById("firstName").addEventListener("input", updateLeader);

document.getElementById("lastName").addEventListener("input", updateLeader);

function autoSaveApplication() {
  const application = collectApplicationData();

  // Determine if the user has actually started the application
  const hasData = [
    application.firstName,
    application.lastName,
    application.contactNumber,
    application.email,
    application.birthDate,
    application.permanentAddress,
  ].some((value) => value && value.toString().trim() !== "");

  if (!hasData) {
    return;
  }

  application.currentStep = currentStep;
  application.lastSaved = new Date().toISOString();

  saveApplication(application);
}

document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener(
    "input",

    autoSaveApplication,
  );

  field.addEventListener(
    "change",

    autoSaveApplication,
  );
});

function restoreApplication() {
  const saved = loadApplication();

  if (!saved) return;

  /********************************************
   * PERSONAL INFORMATION
   ********************************************/

  firstName.value = saved.firstName || "";
  middleName.value = saved.middleName || "";
  lastName.value = saved.lastName || "";
  suffix.value = saved.suffix || "";

  gender.value = saved.gender || "";

  birthDate.value = saved.birthDate || "";
  age.value = saved.age || "";

  civilStatus.value = saved.civilStatus || "";

  nationality.value = saved.nationality || "";
  religion.value = saved.religion || "";

  contactNumber.value = saved.contactNumber || "";
  email.value = saved.email || "";

  permanentAddress.value = saved.permanentAddress || "";

  /********************************************
   * EMERGENCY CONTACT
   ********************************************/

  emergencyName.value = saved.emergencyName || "";

  relationship.value = saved.relationship || "";

  emergencyContact.value = saved.emergencyContact || "";

  emergencyAddress.value = saved.emergencyAddress || "";
  /********************************************
   * MEDICAL INFORMATION
   ********************************************/

  medicalTreatment.value = saved.medicalTreatment || "";

  medicalDetails.value = saved.medicalDetails || "";

  bloodType.value = saved.bloodType || "";

  allergies.value = saved.allergies || "";

  height.value = saved.height || "";

  weight.value = saved.weight || "";

  bodyType.value = saved.bodyType || "";

  birthMarks.value = saved.birthMarks || "";

  complexion.value = saved.complexion || "";

  /********************************************
   * CLIMB SCHEDULE
   ********************************************/

  climbDate.value = saved.climbDate || "";

  organization.value = saved.organization || "";

  entryPoint.value = saved.entryPoint || "";

  exitPoint.value = saved.exitPoint || "";

  climbingExperience.value = saved.climbingExperience || "";

  experienceLevel.value = saved.experienceLevel || "";

  latestMountain.value = saved.latestMountain || "";

  /********************************************
   * TERMS
   ********************************************/

  agreeTerms.checked = saved.agreeTerms || false;

  /********************************************
   * GROUP MEMBERS
   ********************************************/

  if (saved.groupMembers && saved.groupMembers.length > 0) {
    groupMembers = [];

    membersContainer.innerHTML = "";

    saved.groupMembers.forEach((member) => {
      addMember(member);
    });
  }

  /********************************************
   * CURRENT STEP
   ********************************************/

  currentStep = saved.currentStep || 1;

  showStep(currentStep);

  /********************************************
   * RELOAD SCHEDULE AVAILABILITY
   ********************************************/

  if (saved.climbDate) {
    checkSchedule();
  }
  updateLeader();
}

// Auto-save every 30 seconds
setInterval(() => {
  const wizard = document.getElementById("applicationWizard");

  if (!wizard.classList.contains("hidden")) {
    autoSaveApplication();
  }
}, 30000);

window.addEventListener("beforeunload", (event) => {
  if (currentStep > 1) {
    event.preventDefault();

    event.returnValue = "";
  }
});
