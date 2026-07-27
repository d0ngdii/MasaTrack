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

function addMember(member = {}) {
  if (groupMembers.length >= 7) {
    alert("Maximum of 8 hikers per permit.");

    return;
  }

  const index = groupMembers.length;

  const card = document.createElement("div");

  card.className = "member-card";

  card.innerHTML = `
        <h3>Member ${index + 1}</h3>

        <div class="form-grid">

            <div class="form-group">
                <label>First Name</label>
                <input class="member-first">
            </div>

            <div class="form-group">
                <label>Middle Name</label>
                <input class="member-middle">
            </div>

            <div class="form-group">
                <label>Last Name</label>
                <input class="member-last">
            </div>

            <div class="form-group">
                <label>Age</label>
                <input
                    type="number"
                    class="member-age">
            </div>

            <div class="form-group">
                <label>Gender</label>

                <select class="member-gender">

                    <option>Male</option>
                    <option>Female</option>

                </select>

            </div>

        </div>

        <button
            class="remove-member">

            Remove

        </button>
    `;

  membersContainer.appendChild(card);

  groupMembers.push(card);

  updateCounter();

  card.querySelector(".remove-member").addEventListener("click", () => {
    card.remove();

    groupMembers = groupMembers.filter((m) => m !== card);

    renumberMembers();

    updateCounter();
  });
}

function renumberMembers() {
  document.querySelectorAll(".member-card").forEach((card, index) => {
    card.querySelector("h3").textContent = "Member " + (index + 1);
  });
}
