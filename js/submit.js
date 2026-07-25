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

    const formData = new URLSearchParams();

    formData.append("action", "submit");
    formData.append("payload", JSON.stringify(application));

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    const result = await response.json();

    console.log(result);

    if (result.success) {
      alert(
        "Application Submitted!\n\nReceipt Number: " + result.receiptNumber,
      );

      location.reload();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to submit application.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Application";
  }
}
