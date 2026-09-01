/*************************************************
 * MASATRACK
 * Application Data Manager
 *************************************************/

function collectApplicationData() {

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

    permanentAddress: permanentAddress.value.trim(),

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
    // SCHEDULE
    // ======================

    climbDate: climbDate.value,

    organization: organization.value.trim(),

    entryPoint: entryPoint.value,

    exitPoint: exitPoint.value,

    climbingExperience: climbingExperience.value,

    experienceLevel: experienceLevel.value,

    latestMountain: latestMountain.value.trim(),
  };
}
