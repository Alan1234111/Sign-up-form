const password = document.getElementById("pwd");
const confirmPassword = document.getElementById("confirm-pwd");
const requirements = [...document.querySelectorAll(".requirements li")];

function checkIsValid() {
  if (password.value !== confirmPassword.value || password.validity.valid == false) {
    confirmPassword.setCustomValidity("Valid field.");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

function checkRequierments() {
  const text = password.value;

  requirements.forEach((requirement) => {
    requirement.classList.add("invalid");
    requirement.classList.remove("valid");
  });

  //check it is lowercase in text
  if (/[a-z]/.test(text)) {
    const itemToValid = requirements.find((requirement) => requirement.dataset.requirement == "lower-case");
    itemToValid.classList.add("valid");
    itemToValid.classList.remove("invalid");
  }

  //check it is uppercase in text
  if (/[A-Z]/.test(text)) {
    const itemToValid = requirements.find((requirement) => requirement.dataset.requirement == "upper-case");
    itemToValid.classList.add("valid");
    itemToValid.classList.remove("invalid");
  }

  //check it is number in text
  if (/[0-9]/.test(text)) {
    const itemToValid = requirements.find((requirement) => requirement.dataset.requirement == "numeric-value");
    itemToValid.classList.add("valid");
    itemToValid.classList.remove("invalid");
  }

  //check it is special symbol in text
  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(text)) {
    const itemToValid = requirements.find((requirement) => requirement.dataset.requirement == "special-symbol");
    itemToValid.classList.add("valid");
    itemToValid.classList.remove("invalid");
  }

  //check it is a range form 8 to 16 in text
  if (text.length >= 8 && text.length <= 16) {
    const itemToValid = requirements.find((requirement) => requirement.dataset.requirement == "length");
    itemToValid.classList.add("valid");
    itemToValid.classList.remove("invalid");
  }
}

confirmPassword.addEventListener("input", checkIsValid);
password.addEventListener("input", () => {
  checkIsValid();
  checkRequierments();
});
