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
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    const rawText = await response.text();
    console.log("RAW RESPONSE:", rawText);

    let result;
    try {
      result = JSON.parse(rawText);
    } catch (parseError) {
      throw new Error("Server returned non-JSON response.");
    }

    console.log(result);

    if (result.success) {
      showReceipt(result.receiptNumber, application);
    } else {
      alert(result.message || "Submission failed.");
    }
  } catch (error) {
    console.error(error);
    alert(error.message || "Unable to submit application.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Application";
  }
}
