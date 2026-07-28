/*************************************************
 * MASATRACK
 * Submit Application
 *************************************************/

const submitButton = document.getElementById("submitApplicationBtn");

submitButton.addEventListener("click", submitApplication);

async function submitApplication() {
  if (!agreeTerms.checked) {
    showToast("Please accept the Terms and Conditions.", "warning");
    return;
  }

  const application = collectApplicationData();

  // ===========================
  // DEBUG
  // ===========================
  console.log("APPLICATION:", application);
  console.log("GROUP MEMBERS:", application.groupMembers);

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

    console.log("RAW RESPONSE:", rawText);

    let result;

    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error("Server returned an invalid response.");
    }

    console.log(result);

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
