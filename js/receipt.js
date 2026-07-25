/*************************************************
 * MASATRACK
 * Receipt
 *************************************************/

function showReceipt(receiptNumber, application) {
  // Hide the wizard
  document.getElementById("applicationWizard").classList.add("hidden");

  // Show receipt
  document.getElementById("receiptSection").classList.remove("hidden");

  // Populate fields
  document.getElementById("receiptNumber").textContent = receiptNumber;

  document.getElementById("receiptApplicant").textContent =
    application.firstName +
    " " +
    application.middleName +
    " " +
    application.lastName;

  document.getElementById("receiptDate").textContent = application.climbDate;

  document.getElementById("receiptHikers").textContent =
    application.groupMembers.length + 1;

  generateReceiptQR(receiptNumber);
}

function generateReceiptQR(receiptNumber) {
  console.log("QRCode:", typeof QRCode);
  const container = document.getElementById("receiptQR");

  container.innerHTML = "";

  new QRCode(container, {
    text: receiptNumber,

    width: 170,

    height: 170,
  });
}

document.getElementById("printReceipt").addEventListener("click", () => {
  window.print();
});

document.getElementById("backHome").addEventListener("click", () => {
  location.reload();
});

document
  .getElementById("downloadReceipt")
  .addEventListener("click", downloadReceiptPDF);

async function downloadReceiptPDF() {
  const receipt = document.querySelector(".receipt-card");

  const canvas = await html2canvas(receipt);

  const img = canvas.toDataURL("image/png");

  const pdf = new jspdf.jsPDF();

  const width = pdf.internal.pageSize.getWidth();

  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(img, "PNG", 0, 0, width, height);

  pdf.save("Receipt.pdf");
}
