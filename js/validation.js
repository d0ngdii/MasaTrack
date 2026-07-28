/*************************************************
 * MASATRACK
 * Validation
 *************************************************/

function validateStep(step) {
  const currentStepElement = document.getElementById(`step${step}`);

  const requiredFields = currentStepElement.querySelectorAll(
    "input[required], select[required], textarea[required]",
  );

  for (const field of requiredFields) {
    if (!field.value.trim()) {
      const label =
        field.closest(".form-group")?.querySelector("label")?.textContent ||
        "This field";

      showToast(`${label} is required.`, "warning");

      field.focus();

      return false;
    }
  }

  if (step === 5) {
    return validateSchedule();
  }

  return true;
}
