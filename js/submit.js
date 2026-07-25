/*************************************************
 * MASATRACK
 * Submit Application
 *************************************************/

const submitButton = document.getElementById("submitApplicationBtn");

submitButton.addEventListener("click", submitApplication);

async function submitApplication() {
  if (!agreeTerms.checked) {
    alert("Please accept the Terms and Conditions.");
    return;
  }

  const application = collectApplicationData();

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
      showReceipt(result.receiptNumber, application);
    } else {
      throw new Error(result.message || "Submission failed.");
    }
  } catch (error) {
    console.error(error);

    alert(error.message);
  } finally {
    hideLoading();

    submitButton.disabled = false;
    submitButton.textContent = "Submit Application";
  }
}
