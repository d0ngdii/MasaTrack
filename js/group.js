/*************************************************
 * MASATRACK
 * Group Members
 *************************************************/

let groupMembers = [];

const membersContainer = document.getElementById("membersContainer");

const addMemberBtn = document.getElementById("addMemberBtn");

const totalHikers = document.getElementById("totalHikers");

const leaderName = document.getElementById("leaderName");

addMemberBtn.addEventListener("click", addMember);

function updateLeader() {
  const first = document.getElementById("firstName").value;

  const last = document.getElementById("lastName").value;

  leaderName.textContent = first + " " + last;
}

function updateCounter() {
  totalHikers.textContent = groupMembers.length + 1;

  if (groupMembers.length + 1 >= 8) {
    addMemberBtn.disabled = true;
  } else {
    addMemberBtn.disabled = false;
  }
}

function createMemberCard(index, data = {}) {
  return `
        <div class="member-card" data-member="${index}">

            ${memberHeader(index, data)}

            <div class="member-content">

                ${memberPersonal(data)}

                ${memberPhysical(data)}

                ${memberEmergency(data)}

                ${memberClimbing(data)}

            </div>

        </div>
    `;
}

function memberHeader(index, data) {
  return `

<div class="member-header">

    <div class="member-title">

        👤

        <span class="member-name">

        ${data.firstName || ""} ${data.lastName || "" || `Member ${index}`}

        </span>

    </div>

    <button
        type="button"
        class="member-toggle">

        ▼

    </button>

</div>

`;
}

function memberPersonal(data = {}) {
  return `

<h3>Personal Information</h3>

<div class="form-grid">

<div class="form-group">
<label>First Name</label>
<input class="member-first" value="${data.firstName || ""}">
</div>

<div class="form-group">
<label>Middle Name</label>
<input class="member-middle" value="${data.middleName || ""}">
</div>

<div class="form-group">
<label>Last Name</label>
<input class="member-last" value="${data.lastName || ""}">
</div>

<div class="form-group">
<label>Suffix</label>
<input class="member-suffix" value="${data.suffix || ""}">
</div>

<div class="form-group">
<label>Gender</label>

<select class="member-gender">

<option>Male</option>

<option>Female</option>

</select>

</div>

<div class="form-group">
<label>Birth Date</label>

<input
type="date"
class="member-birthdate"
value="${data.birthDate || ""}">

</div>

<div class="form-group">
<label>Age</label>

<input
readonly
class="member-age"
value="${data.age || ""}">

</div>

<div class="form-group">
<label>Civil Status</label>

<select class="member-civilStatus">

<option>Single</option>

<option>Married</option>

<option>Widowed</option>

<option>Divorced</option>

</select>

</div>

<div class="form-group">

<label>Nationality</label>

<input class="member-nationality">

</div>

<div class="form-group">

<label>Religion</label>

<input class="member-religion">

</div>

<div class="form-group">

<label>Contact Number</label>

<input class="member-contact">

</div>

<div class="form-group">

<label>Email</label>

<input
type="email"
class="member-email">

</div>

<div class="form-group full-width">

<label>Permanent Address</label>

<input class="member-address">

</div>

</div>

`;
}

function memberPhysical(data = {}) {
  return `

    <h3>Physical Description</h3>

    <div class="form-grid">

        <div class="form-group">
            <label>Height (cm)</label>
            <input
                type="number"
                class="member-height"
                value="${data.height || ""}">
        </div>

        <div class="form-group">
            <label>Weight (kg)</label>
            <input
                type="number"
                class="member-weight"
                value="${data.weight || ""}">
        </div>

        <div class="form-group">
            <label>Blood Type</label>

            <select class="member-bloodType">

                <option value="">Select Blood Type</option>

                <option ${data.bloodType === "A+" ? "selected" : ""}>A+</option>
                <option ${data.bloodType === "A-" ? "selected" : ""}>A-</option>
                <option ${data.bloodType === "B+" ? "selected" : ""}>B+</option>
                <option ${data.bloodType === "B-" ? "selected" : ""}>B-</option>
                <option ${data.bloodType === "AB+" ? "selected" : ""}>AB+</option>
                <option ${data.bloodType === "AB-" ? "selected" : ""}>AB-</option>
                <option ${data.bloodType === "O+" ? "selected" : ""}>O+</option>
                <option ${data.bloodType === "O-" ? "selected" : ""}>O-</option>

            </select>
        </div>

        <div class="form-group">
            <label>Body Type</label>

            <select class="member-bodyType">

                <option value="">Select</option>

                <option ${data.bodyType === "Slim" ? "selected" : ""}>Slim</option>
                <option ${data.bodyType === "Average" ? "selected" : ""}>Average</option>
                <option ${data.bodyType === "Athletic" ? "selected" : ""}>Athletic</option>
                <option ${data.bodyType === "Heavy" ? "selected" : ""}>Heavy</option>

            </select>
        </div>

        <div class="form-group">
            <label>Distinguishing Marks</label>
            <input
                class="member-birthMarks"
                value="${data.birthMarks || ""}">
        </div>

        <div class="form-group">
            <label>Complexion</label>

            <select class="member-complexion">

                <option value="">Select</option>

                <option ${data.complexion === "Fair" ? "selected" : ""}>Fair</option>
                <option ${data.complexion === "Light" ? "selected" : ""}>Light</option>
                <option ${data.complexion === "Medium" ? "selected" : ""}>Medium</option>
                <option ${data.complexion === "Morena" ? "selected" : ""}>Morena</option>
                <option ${data.complexion === "Dark" ? "selected" : ""}>Dark</option>

            </select>

        </div>

    </div>

  `;
}

function memberEmergency(data = {}) {
  return `

    <h3>Emergency Contact</h3>

    <div class="form-grid">

        <div class="form-group">
            <label>Contact Name</label>
            <input
                class="member-emergencyName"
                value="${data.emergencyName || ""}">
        </div>

        <div class="form-group">
            <label>Relationship</label>
            <input
                class="member-relationship"
                value="${data.relationship || ""}">
        </div>

        <div class="form-group">
            <label>Contact Number</label>
            <input
                class="member-emergencyContact"
                value="${data.emergencyContact || ""}">
        </div>

        <div class="form-group full-width">
            <label>Emergency Address</label>
            <input
                class="member-emergencyAddress"
                value="${data.emergencyAddress || ""}">
        </div>

    </div>

  `;
}

function memberClimbing(data = {}) {
  return `

    <h3>Climbing Information</h3>

    <div class="form-grid">

        <div class="form-group">
            <label>Mountain Climbing Experience</label>

            <select class="member-experience">

                <option value="">Select</option>

                <option ${data.experience == "Beginner" ? "selected" : ""}>
                    Beginner
                </option>

                <option ${data.experience == "Intermediate" ? "selected" : ""}>
                    Intermediate
                </option>

                <option ${data.experience == "Advanced" ? "selected" : ""}>
                    Advanced
                </option>

            </select>
        </div>

        <div class="form-group">
            <label>Latest Mountain Climbed</label>

            <input
                class="member-latestMountain"
                value="${data.latestMountain || ""}">
        </div>

        <div class="form-group">
            <label>Currently Under Medical Treatment?</label>

            <select class="member-medicalTreatment">

                <option value="">Select</option>

                <option ${data.medicalTreatment == "No" ? "selected" : ""}>
                    No
                </option>

                <option ${data.medicalTreatment == "Yes" ? "selected" : ""}>
                    Yes
                </option>

            </select>
        </div>

        <div class="form-group">
            <label>Medical Condition / Details</label>

            <input
                class="member-medicalDetails"
                value="${data.medicalDetails || ""}">
        </div>

        <div class="form-group full-width">
            <label>Allergies</label>

            <input
                class="member-allergies"
                value="${data.allergies || ""}">
        </div>

    </div>

  `;
}

function addMember(member = {}) {
  if (groupMembers.length >= 7) {
    showToast("Maximum of 8 hikers per application.", "warning");

    return;
  }

  groupMembers.push(member);

  membersContainer.insertAdjacentHTML(
    "beforeend",

    createMemberCard(groupMembers.length, member),
  );

  // updateGroupSummary();

  initializeMemberEvents();
}

function renumberMembers() {
  document.querySelectorAll(".member-card").forEach((card, index) => {
    card.querySelector("h3").textContent = "Member " + (index + 1);
  });
}

function initializeMemberEvents() {
  document.querySelectorAll(".member-card").forEach((card) => {
    /* =========================
       Accordion
    ========================= */

    const header = card.querySelector(".member-header");

    header.onclick = () => {
      card.classList.toggle("open");
    };

    /* =========================
       Member Name
    ========================= */

    const first = card.querySelector(".member-first");
    const last = card.querySelector(".member-last");
    const title = card.querySelector(".member-name");

    function updateTitle() {
      const full = `${first.value} ${last.value}`.trim();

      title.textContent = full || "New Member";
    }

    first.oninput = updateTitle;
    last.oninput = updateTitle;

    /* =========================
       Auto-compute Age
    ========================= */

    const birthInput = card.querySelector(".member-birthdate");
    const ageInput = card.querySelector(".member-age");

    birthInput.onchange = () => {
      ageInput.value = calculateAge(birthInput.value);
    };

    // Calculate immediately if restoring saved data
    if (birthInput.value) {
      ageInput.value = calculateAge(birthInput.value);
    }
  });
}
function calculateAge(dateString) {
  if (!dateString) return "";

  const today = new Date();
  const birth = new Date(dateString);

  let age = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
