/*************************************************
 * MASATRACK
 * Submit Application
 *************************************************/

const submitButton = document.getElementById("submitApplicationBtn");

submitButton.addEventListener("click", submitApplication);

async function submitApplication() {
  const agreeTerms = document.getElementById("agreeTerms");

  if (!agreeTerms.checked) {
    showToast("Please accept the Terms and Conditions.", "warning");

    agreeTerms.focus();

    return;
  }

  const application = collectApplicationData();

  // ===========================
  // DEBUG
  // ===========================
  debug("APPLICATION:", application);
  debug("GROUP MEMBERS:", application.groupMembers);
  debug(application);
  debug(application.permanentAddress);
  debug(JSON.stringify(application, null, 2));

  try {
    showLoading(
      "Submitting Application",
      "Please wait while we save your application.",
    );

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const response = await fetch("/api/submit", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(application),
    });

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`Server Error (${response.status})`);
    }

    const rawText = await response.text();

    debug("RAW RESPONSE:");
    debug(rawText);

    let result;

    try {
      result = JSON.parse(rawText);
    } catch (err) {
      console.error("Invalid JSON returned by Apps Script");
      console.error(rawText);
      throw err;
    }

    debug(result);

    if (result.success) {
      showToast("Application submitted successfully!", "success");

      setTimeout(() => {
        showReceipt(result.receiptNumber, application);
        clearApplication();
        window.onbeforeunload = null;
      }, 1200);
    } else {
      throw new Error(result.message || "Submission failed.");
    }
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");
  } finally {
    hideLoading();

    submitButton.disabled = false;
    submitButton.textContent = "Submit Application";
  }
}

/*************************************************
 * MASATRACK
 * Auto Save
 *************************************************/

const APPLICATION_STORAGE_KEY = "masatrack_application";

function saveApplication(data) {
  localStorage.setItem(
    APPLICATION_STORAGE_KEY,

    JSON.stringify(data),
  );
}

function loadApplication() {
  const saved = localStorage.getItem(APPLICATION_STORAGE_KEY);

  return saved ? JSON.parse(saved) : null;
}

function clearApplication() {
  localStorage.removeItem(APPLICATION_STORAGE_KEY);
}
