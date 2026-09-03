/*************************************************
 * MASATRACK
 * Submit Application
 *************************************************/

const paymentReceiptInput = document.getElementById("paymentReceipt");

const paymentReceiptStatus = document.getElementById("paymentReceiptStatus");

const paymentReceiptPreview = document.getElementById("paymentReceiptPreview");

const paymentReceiptImagePreview = document.getElementById(
  "paymentReceiptImagePreview",
);

const MAX_PAYMENT_RECEIPT_SIZE = 5 * 1024 * 1024;

let selectedPaymentReceipt = null;

let paymentReceiptPreviewUrl = null;

if (paymentReceiptInput) {
  paymentReceiptInput.addEventListener("change", handlePaymentReceiptChange);
}

function handlePaymentReceiptChange() {
  const file = paymentReceiptInput.files[0];

  clearPaymentReceiptError();

  if (!file) {
    selectedPaymentReceipt = null;

    resetPaymentReceiptDisplay();

    return;
  }

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (!allowedTypes.includes(file.type)) {
    paymentReceiptInput.value = "";

    selectedPaymentReceipt = null;

    showPaymentReceiptError(
      "Invalid file type. Please upload a JPG, PNG, or PDF file.",
    );

    return;
  }

  if (file.size > MAX_PAYMENT_RECEIPT_SIZE) {
    paymentReceiptInput.value = "";

    selectedPaymentReceipt = null;

    showPaymentReceiptError(
      "File is too large. The maximum receipt size is 5 MB.",
    );

    return;
  }

  selectedPaymentReceipt = file;

  console.log("PAYMENT RECEIPT SELECTED:", selectedPaymentReceipt);
  console.log("FILE NAME:", selectedPaymentReceipt.name);
  console.log("FILE TYPE:", selectedPaymentReceipt.type);
  console.log("FILE SIZE:", selectedPaymentReceipt.size);

  paymentReceiptStatus.textContent = `Receipt selected: ${file.name} (${formatFileSize(file.size)})`;

  paymentReceiptStatus.classList.add("success");

  if (file.type.startsWith("image/")) {
    if (paymentReceiptPreviewUrl) {
      URL.revokeObjectURL(paymentReceiptPreviewUrl);
    }

    paymentReceiptPreviewUrl = URL.createObjectURL(file);

    paymentReceiptImagePreview.src = paymentReceiptPreviewUrl;

    paymentReceiptPreview.classList.remove("hidden");
  } else {
    paymentReceiptPreview.classList.add("hidden");
  }
}

function validatePaymentReceipt() {
  clearPaymentReceiptError();

  if (!selectedPaymentReceipt) {
    showPaymentReceiptError(
      "Please upload your payment receipt before submitting.",
    );

    paymentReceiptInput.focus();

    return false;
  }

  return true;
}

function showPaymentReceiptError(message) {
  paymentReceiptStatus.textContent = message;

  paymentReceiptStatus.classList.remove("success");

  paymentReceiptStatus.classList.add("error");

  paymentReceiptInput.classList.add("input-error");
}

function clearPaymentReceiptError() {
  paymentReceiptStatus.classList.remove("error");

  paymentReceiptInput.classList.remove("input-error");
}

function resetPaymentReceiptDisplay() {
  paymentReceiptStatus.textContent = "No receipt selected.";

  paymentReceiptStatus.classList.remove("success", "error");

  paymentReceiptPreview.classList.add("hidden");

  if (paymentReceiptPreviewUrl) {
    URL.revokeObjectURL(paymentReceiptPreviewUrl);

    paymentReceiptPreviewUrl = null;
  }

  paymentReceiptImagePreview.removeAttribute("src");
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      // Remove:
      // data:image/jpeg;base64,
      // data:image/png;base64,
      // data:application/pdf;base64,

      const base64 = result.split(",")[1];

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the payment receipt."));
    };

    reader.readAsDataURL(file);
  });
}

const submitButton = document.getElementById("submitApplicationBtn");

submitButton.addEventListener("click", submitApplication);

async function submitApplication() {
  const agreeTerms = document.getElementById("agreeTerms");

  if (!agreeTerms.checked) {
    showToast("Please accept the Terms and Conditions.", "warning");

    agreeTerms.focus();

    return;
  }

  if (!validatePaymentReceipt()) {
    showToast("Please upload your payment receipt.", "warning");

    return;
  }

  const application = collectApplicationData();

  application.paymentReceipt = {
    fileName: selectedPaymentReceipt.name,
    mimeType: selectedPaymentReceipt.type,
    data: await fileToBase64(selectedPaymentReceipt),
  };

  // ===========================
  // DEBUG
  // ===========================
  debug("APPLICATION:", application);
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
