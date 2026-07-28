/*************************************************
 * MASATRACK
 * Review
 *************************************************/

const reviewContainer = document.getElementById("reviewContainer");

function generateReview() {
  const application = collectApplicationData();

  let html = "";

  /* =========================
       PERSONAL INFORMATION
    ========================= */

  html += `
    <div class="review-section">

        <h3>Personal Information</h3>

        <div class="review-item">
            <span class="review-label">Name</span>
            <span>
                ${application.firstName}
                ${application.middleName}
                ${application.lastName}
                ${application.suffix}
            </span>
        </div>

        <div class="review-item">
            <span class="review-label">Gender</span>
            <span>${application.gender}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Birth Date</span>
            <span>${application.birthDate}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Age</span>
            <span>${application.age}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Civil Status</span>
            <span>${application.civilStatus}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Nationality</span>
            <span>${application.nationality}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Religion</span>
            <span>${application.religion}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Contact Number</span>
            <span>${application.contactNumber}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Email</span>
            <span>${application.email}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Permanent Address</span>
            <span>${application.permanentAddress}</span>
        </div>

    </div>
    `;

  /* =========================
       EMERGENCY CONTACT
    ========================= */

  html += `
    <div class="review-section">

        <h3>Emergency Contact</h3>

        <div class="review-item">
            <span class="review-label">Name</span>
            <span>${application.emergencyName}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Relationship</span>
            <span>${application.relationship}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Contact Number</span>
            <span>${application.emergencyContact}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Address</span>
            <span>${application.emergencyAddress}</span>
        </div>

    </div>
    `;

  /* =========================
       MEDICAL INFORMATION
    ========================= */

  html += `
    <div class="review-section">

        <h3>Medical Information</h3>

        <div class="review-item">
            <span class="review-label">Blood Type</span>
            <span>${application.bloodType}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Medical Treatment</span>
            <span>${application.medicalTreatment}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Medical Details</span>
            <span>${application.medicalDetails || "None"}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Allergies</span>
            <span>${application.allergies || "None"}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Height</span>
            <span>${application.height} cm</span>
        </div>

        <div class="review-item">
            <span class="review-label">Weight</span>
            <span>${application.weight} kg</span>
        </div>

        <div class="review-item">
            <span class="review-label">Body Type</span>
            <span>${application.bodyType}</span>
        </div>

        <div class="review-item">
            <span class="review-label">Complexion</span>
            <span>${application.complexion}</span>
        </div>

    </div>
    `;

  /* =========================
       GROUP MEMBERS
    ========================= */

  html += `
    <div class="review-section">

        <h3>Group Members</h3>
    `;

  if (application.groupMembers.length === 0) {
    html += "<p>No additional group members.</p>";
  } else {
    application.groupMembers.forEach((member, index) => {
      html += `
                <div class="review-item">
                    <span class="review-label">
                        Member ${index + 1}
                    </span>

                    <span>
                        ${member.firstName}
                        ${member.middleName}
                        ${member.lastName}
                    </span>
                </div>
            `;
    });
  }

  html += "</div>";
  /* =========================
   CLIMB SCHEDULE
========================= */

  html += `
<div class="review-section">

    <h3>Climb Schedule</h3>

    <div class="review-item">
        <span class="review-label">Climb Date</span>
        <span>${application.climbDate || "-"}</span>
    </div>

    <div class="review-item">
        <span class="review-label">Entry Point</span>
        <span>${application.entryPoint || "-"}</span>
    </div>

    <div class="review-item">
        <span class="review-label">Exit Point</span>
        <span>${application.exitPoint || "-"}</span>
    </div>

    <div class="review-item">
        <span class="review-label">Mountain Climbing Experience</span>
        <span>${application.climbingExperience || "-"}</span>
    </div>

    <div class="review-item">
        <span class="review-label">Experience Level</span>
        <span>${application.experienceLevel || "-"}</span>
    </div>

    <div class="review-item">
        <span class="review-label">Latest Mountain Climbed</span>
        <span>${application.latestMountain || "-"}</span>
    </div>

    <div class="review-item">
        <span class="review-label">Total Hikers</span>
        <span>${application.totalHikers}</span>
    </div>

</div>
`;

  reviewContainer.innerHTML = html;
}
