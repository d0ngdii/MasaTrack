const API_URL =
  "https://script.google.com/macros/s/AKfycbxAko5142kaEqjaea44XASbPlsSqxWtQwqlXoiErXUcQNJZAnai6KRC_1gZM0iiXBwq/exec";

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
