/*************************************************
 * MASATRACK
 * Application Data Manager
 *************************************************/

function collectApplicationData() {
  const members = [];

  document.querySelectorAll(".member-card").forEach((card) => {
    members.push({
      /* ==========================
           PERSONAL INFORMATION
        ========================== */

      firstName: card.querySelector(".member-first").value.trim(),

      middleName: card.querySelector(".member-middle").value.trim(),

      lastName: card.querySelector(".member-last").value.trim(),

      suffix: card.querySelector(".member-suffix").value.trim(),

      gender: card.querySelector(".member-gender").value,

      birthDate: card.querySelector(".member-birthdate").value,

      age: Number(card.querySelector(".member-age").value),

      civilStatus: card.querySelector(".member-civilStatus").value,

      nationality: card.querySelector(".member-nationality").value.trim(),

      religion: card.querySelector(".member-religion").value.trim(),

      contactNumber: card.querySelector(".member-contact").value.trim(),

      email: card.querySelector(".member-email").value.trim(),

      permanentAddress: card.querySelector(".member-permanentAddress").value.trim(),

      /* ==========================
           PHYSICAL INFORMATION
        ========================== */

      height: Number(card.querySelector(".member-height").value),

      weight: Number(card.querySelector(".member-weight").value),

      bloodType: card.querySelector(".member-bloodType").value,

      bodyType: card.querySelector(".member-bodyType").value,

      birthMarks: card.querySelector(".member-birthMarks").value.trim(),

      complexion: card.querySelector(".member-complexion").value,

      /* ==========================
           EMERGENCY CONTACT
        ========================== */

      emergencyName: card.querySelector(".member-emergencyName").value.trim(),

      relationship: card.querySelector(".member-relationship").value.trim(),

      emergencyContact: card
        .querySelector(".member-emergencyContact")
        .value.trim(),

      emergencyAddress: card
        .querySelector(".member-emergencyAddress")
        .value.trim(),

      /* ==========================
           MEDICAL / CLIMBING
        ========================== */

      medicalTreatment: card.querySelector(".member-medicalTreatment").value,

      medicalDetails: card.querySelector(".member-medicalDetails").value.trim(),

      allergies: card.querySelector(".member-allergies").value.trim(),

      experience: card.querySelector(".member-experience").value,

      latestMountain: card.querySelector(".member-latestMountain").value.trim(),
    });
  });

  return {
    action: "submit",

    // ======================
    // PERSONAL
    // ======================

    firstName: firstName.value.trim(),

    middleName: middleName.value.trim(),

    lastName: lastName.value.trim(),

    suffix: suffix.value.trim(),

    gender: gender.value,

    birthDate: birthDate.value,

    age: Number(age.value),

    civilStatus: civilStatus.value,

    nationality: nationality.value.trim(),

    religion: religion.value.trim(),

    contactNumber: contactNumber.value.trim(),

    email: email.value.trim(),

    // ======================
    // EMERGENCY
    // ======================

    emergencyName: emergencyName.value.trim(),

    relationship: relationship.value.trim(),

    emergencyContact: emergencyContact.value.trim(),

    emergencyAddress: emergencyAddress.value.trim(),

    // ======================
    // MEDICAL
    // ======================

    medicalTreatment: medicalTreatment.value,

    medicalDetails: medicalDetails.value.trim(),

    bloodType: bloodType.value,

    allergies: allergies.value.trim(),

    height: Number(height.value),

    weight: Number(weight.value),

    bodyType: bodyType.value,

    birthMarks: birthMarks.value.trim(),

    complexion: complexion.value,

    // ======================
    // GROUP
    // ======================

    groupMembers: members,

    totalHikers: members.length + 1,

    // ======================
    // SCHEDULE
    // ======================

    climbDate: climbDate.value,

    entryPoint: entryPoint.value,

    exitPoint: exitPoint.value,

    climbingExperience: climbingExperience.value,

    experienceLevel: experienceLevel.value,

    latestMountain: latestMountain.value.trim(),
  };
}
