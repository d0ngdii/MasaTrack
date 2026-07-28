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
class="member-birthdate">

</div>

<div class="form-group">
<label>Age</label>

<input
readonly
class="member-age">

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

function memberPhysical() {
  return `

<h3>Physical Description</h3>

<p>Coming next...</p>

`;
}

function memberEmergency() {
  return `

<h3>Emergency Contact</h3>

<p>Coming next...</p>

`;
}

function memberClimbing() {
  return `

<h3>Climbing Information</h3>

<p>Coming next...</p>

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
  document.querySelectorAll(".member-header").forEach((header) => {
    header.onclick = () => {
      const card = header.closest(".member-card");

      card.classList.toggle("open");
    };
  });

  document.querySelectorAll(".member-card").forEach((card) => {
    const first = card.querySelector(".member-first");

    const last = card.querySelector(".member-last");

    const title = card.querySelector(".member-name");

    function updateTitle() {
      const full = `${first.value} ${last.value}`.trim();

      title.textContent = full || "New Member";
    }

    first.addEventListener("input", updateTitle);

    last.addEventListener("input", updateTitle);
  });
}

function calculateAge(dateString) {
    if (!dateString) return "";

    const today = new Date();
    const birth = new Date(dateString);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
}

document.querySelectorAll(".member-card").forEach(card => {

    const birthInput = card.querySelector(".member-birthdate");
    const ageInput = card.querySelector(".member-age");

    birthInput.addEventListener("change", () => {
        ageInput.value = calculateAge(birthInput.value);
    });

});