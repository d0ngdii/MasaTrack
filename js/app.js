const birthDate = document.getElementById("birthDate");

const age = document.getElementById("age");

birthDate.addEventListener("change", () => {
  const dob = new Date(birthDate.value);

  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();

  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    years--;
  }

  age.value = years;
});

document.getElementById("firstName").addEventListener("input", updateLeader);

document.getElementById("lastName").addEventListener("input", updateLeader);
