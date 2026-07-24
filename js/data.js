/*************************************************
 * MASATRACK
 * Application Data Manager
 *************************************************/

function collectApplicationData() {
  const members = [];

  document.querySelectorAll(".member-card").forEach((card) => {
    members.push({
      firstName: card.querySelector(".member-first").value.trim(),

      middleName: card.querySelector(".member-middle").value.trim(),

      lastName: card.querySelector(".member-last").value.trim(),

      age: Number(card.querySelector(".member-age").value),

      gender: card.querySelector(".member-gender").value,
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
  };
}
