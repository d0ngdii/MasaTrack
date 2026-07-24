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

    const result = await checkAvailability(date, groupSize);

    console.log("API Response:", result);

    remainingSlots.textContent = result.available;

    if (result.available >= groupSize) {
      availabilityMessage.innerHTML = "✅ Schedule Available";

      availabilityMessage.style.color = "green";

      scheduleNextBtn.disabled = false;
    } else {
      availabilityMessage.innerHTML = "❌ Not enough slots remaining.";

      availabilityMessage.style.color = "red";

      scheduleNextBtn.disabled = true;
    }
  } catch (error) {
    console.error(error);

    availabilityMessage.innerHTML = error.message;

    availabilityMessage.style.color = "red";

    scheduleNextBtn.disabled = true;
  }
}
