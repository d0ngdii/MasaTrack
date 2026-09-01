/*************************************************
 * MASATRACK
 * Schedule
 *************************************************/

const climbDate = document.getElementById("climbDate");
const remainingSlots = document.getElementById("remainingSlots");
const groupSizeDisplay = document.getElementById("groupSizeDisplay");
const availabilityMessage = document.getElementById("availabilityMessage");
const scheduleNextBtn = document.getElementById("scheduleNextBtn");

/*************************************************
 * Schedule State
 *************************************************/

let scheduleAvailable = false;
let checkingSchedule = false;

climbDate.addEventListener("change", checkSchedule);

/*************************************************
 * Loading UI
 *************************************************/

function showScheduleLoading() {
  checkingSchedule = true;

  remainingSlots.textContent = "...";

  availabilityMessage.innerHTML = `
        <div class="schedule-loading">
            <div class="schedule-spinner"></div>
            Checking availability...
        </div>
    `;

  availabilityMessage.style.background = "#F5F5F5";
  availabilityMessage.style.color = "#555";

  scheduleNextBtn.disabled = true;
}

function hideScheduleLoading() {
  checkingSchedule = false;
}

/*************************************************
 * Check Schedule Availability
 *************************************************/

async function checkSchedule() {
  const groupSize = 1;

  groupSizeDisplay.textContent = groupSize;

  const date = climbDate.value;

  if (!date) {
    scheduleAvailable = false;

    remainingSlots.textContent = "-";

    availabilityMessage.textContent = "Please select a climb date.";

    availabilityMessage.style.background = "#F5F5F5";
    availabilityMessage.style.color = "#555";

    scheduleNextBtn.disabled = true;

    return;
  }

  showScheduleLoading();

  try {
    debug("Checking date:", date);
    debug("Group Size:", groupSize);

    const result = await window.checkAvailability(date, groupSize);

    debug("API Response:", result);

    remainingSlots.textContent = result.available;

    if (result.available >= groupSize) {
      scheduleAvailable = true;

      availabilityMessage.textContent = "✔ Schedule Available";

      availabilityMessage.style.background = "#E8F5E9";
      availabilityMessage.style.color = "#2E7D32";

      scheduleNextBtn.disabled = false;
    } else {
      scheduleAvailable = false;

      availabilityMessage.textContent = "✖ Schedule Full";

      availabilityMessage.style.background = "#FFEBEE";
      availabilityMessage.style.color = "#C62828";

      scheduleNextBtn.disabled = true;
    }
  } catch (error) {
    console.error(error);

    scheduleAvailable = false;

    remainingSlots.textContent = "-";

    availabilityMessage.textContent = "Unable to check schedule availability.";

    availabilityMessage.style.background = "#FFEBEE";
    availabilityMessage.style.color = "#C62828";

    scheduleNextBtn.disabled = true;
  } finally {
    hideScheduleLoading();
  }
}

/*************************************************
 * Validation
 *************************************************/

function validateSchedule() {
  if (!climbDate.value) {
    showToast("Please select a climb date.", "warning");

    climbDate.focus();

    return false;
  }

  if (checkingSchedule) {
    showToast(
      "Please wait while schedule availability is being checked.",
      "info",
    );

    return false;
  }

  if (!scheduleAvailable) {
    showToast("No available slots for the selected climb date.", "warning");

    climbDate.focus();

    return false;
  }

  return true;
}
