const API_URL =
  "https://script.google.com/macros/s/AKfycbwwUcJEFCf4a6nucGB3dgUlQsPmIKP1d2zdDllckBsPGSFPmbI7SoS1o5I_9kFxI2CV/exec";

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
