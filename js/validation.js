/*************************************************
 * MASATRACK
 * Validation
 *************************************************/

function validateStep(step) {
  const current = document.getElementById(`step${step}`);

  const requiredFields = current.querySelectorAll(
    "input[required], select[required], textarea[required]",
  );

  clearValidation();

  for (const field of requiredFields) {
    const value =
      field.type === "checkbox" ? field.checked : field.value.trim();

    if (!value) {
      field.classList.add("input-error");

      const label =
        field.closest(".form-group")?.querySelector("label")?.textContent ||
        "This field";

      showToast(`${label} is required.`, "warning");

      field.scrollIntoView({
        behavior: "smooth",

        block: "center",
      });

      field.focus();

      return false;
    }
  }

  if (step === 5) {
    return validateSchedule();
  }

  const emailField = current.querySelector("#email");

  if (emailField && emailField.value) {
    if (!isValidEmail(emailField.value)) {
      emailField.classList.add("input-error");

      showToast("Please enter a valid email address.", "warning");

      emailField.focus();

      return false;
    }
  }

  const phone = current.querySelector("#contactNumber");

  if (phone && phone.value) {
    if (!isValidPhone(phone.value)) {
      phone.classList.add("input-error");

      showToast("Please enter a valid mobile number.", "warning");

      phone.focus();

      return false;
    }
  }

  // Validate minimum age (18)

  if (birth && birth.value) {
    const today = new Date();
    const birthDate = new Date(birth.value);

    let applicantAge = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      applicantAge--;
    }

    if (applicantAge < 18) {
      birth.classList.add("input-error");

      showToast("Applicants must be at least 18 years old.", "warning");

      birth.focus();

      return false;
    }
  }

  return true;
}

function clearValidation() {
  document.querySelectorAll(".input-error").forEach((field) => {
    field.classList.remove("input-error");
  });
}

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-error")) {
    e.target.classList.remove("input-error");
  }
});

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("input-error")) {
    e.target.classList.remove("input-error");
  }
});

/*************************************************
 * Validation Helpers
 *************************************************/

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(number) {
  return /^09\d{9}$/.test(number);
}
