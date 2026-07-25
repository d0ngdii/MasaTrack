/*************************************************
 * MASATRACK
 * Schedule
 *************************************************/

const climbDate = document.getElementById("climbDate");

const remainingSlots = document.getElementById("remainingSlots");

const groupSizeDisplay = document.getElementById("groupSizeDisplay");

const availabilityMessage = document.getElementById("availabilityMessage");

const scheduleNextBtn = document.getElementById("scheduleNextBtn");

climbDate.addEventListener("change", checkSchedule);

async function checkSchedule() {
  const groupSize = groupMembers.length + 1;

  groupSizeDisplay.textContent = groupSize;

  const date = climbDate.value;

  if (!date) return;

  try {
    // This function will be added to api.js
    console.log("Checking date:", date);
    console.log("Group Size:", groupSize);

    const result = await window.checkAvailability(date, groupSize);

    console.log("API Response:", result);

    remainingSlots.textContent = result.available;

    if (result.available >= groupSize) {
      availabilityMessage.textContent = "✔ Schedule Available";

      availabilityMessage.style.background = "#E8F5E9";
      availabilityMessage.style.color = "#2E7D32";

      scheduleNextBtn.disabled = false;
    } else {
      availabilityMessage.textContent = "✖ Schedule Full";

      availabilityMessage.style.background = "#FFEBEE";
      availabilityMessage.style.color = "#C62828";

      scheduleNextBtn.disabled = true;
    }
  } catch (error) {
    console.error(error);

    availabilityMessage.textContent = "Please select a date.";

    availabilityMessage.style.background = "#F5F5F5";
    availabilityMessage.style.color = "#555";

    scheduleNextBtn.disabled = true;
  }
}
