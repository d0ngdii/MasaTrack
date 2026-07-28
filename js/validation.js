/*************************************************
 * MASATRACK
 * Validation
 *************************************************/

function validateStep(step) {
  switch (step) {
    case 1:
      return validatePersonal();

    case 2:
      return validateEmergency();

    case 3:
      return validateMedical();

    case 4:
      return validateGroup();

    case 5:
      return validateSchedule();

    default:
      return true;
  }
}

function validateSchedule() {
  if (!climbDate.value) {
    showToast("Please select a climb date.", "warning");

    climbDate.focus();

    return false;
  }

  if (scheduleNextBtn.disabled) {
    showToast("Please wait until the schedule is checked.", "warning");

    return false;
  }

  return true;
}
