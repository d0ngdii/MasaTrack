const API_URL =
  "https://script.google.com/macros/s/AKfycbzG-DX_UT-9gouLoHJuEQR-M8dw2zZFEJ0uVtE7JJh5VVgvOqOKPePePUsmGMxmrYBr/exec";

async function checkAvailability(date, hikers) {
  const response = await fetch(
    API_URL +
      "?action=availability" +
      "&date=" +
      encodeURIComponent(date) +
      "&hikers=" +
      encodeURIComponent(hikers),
  );

  return await response.json();
}

window.API_URL = API_URL;
window.checkAvailability = checkAvailability;
