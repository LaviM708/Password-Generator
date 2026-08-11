// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

// user should first select the options the way they want their password to be from length uppercase lowercase
// numbers or symbols should be included or not
// and when they press the button to generate password
// the function should consider all the options and then generate a password form teh character sets matching the conditions
// user have given then the user should be able to see and copy the password from copyButton

//1) EVENT FLOW

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", generatePassword);

window.addEventListener("DOMContentLoaded", generatePassword);

function generatePassword() {
  // 1. Get the selected password length
  const passwordLength = Number(lengthSlider.value);

  console.log(passwordLength);

  // 2. check which character options are selected
  // 3. build one string containing all allowed characters
  let allowedCharacters = getAllowedCharacters();

  if (allowedCharacters.length === 0) {
    alert("Please select at least one option");
    return;
  }

  // 4. Generate random characters untill password reaches selected length
  const password = createRandomPassword(passwordLength, allowedCharacters);

  // 5. Display the generated password
  passwordInput.value = password;

  // 6. Update the password strength
  updateStrengthMeter(password);
}

function createRandomPassword(length, characters) {
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

function getAllowedCharacters() {
  // then check each checkbox
  let characters = "";

  if (uppercaseCheckbox.checked) {
    characters += uppercaseLetters;
  }

  if (lowercaseCheckbox.checked) {
    characters += lowercaseLetters;
  }

  if (numbersCheckbox.checked) {
    characters += numberCharacters;
  }

  if (symbolsCheckbox.checked) {
    characters += symbolCharacters;
  }
  return characters;
}

function updateStrengthMeter(password) {
  const passwordLength = password.length;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(password);

  let strengthScore = 0;

  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) {
    strengthScore += 15;
  }

  if (hasLowercase) {
    strengthScore += 15;
  }

  if (hasNumbers) {
    strengthScore += 15;
  }

  if (hasSymbols) {
    strengthScore += 15;
  }

  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  const safeScore = Math.max(5, Math.min(100, strengthScore));
  strengthBar.style.width = safeScore + "%";
  console.log(`Strength score ${strengthScore}`);

  if (strengthScore < 40) {
    strengthLabel.textContent = "Weak";
    strengthBar.style.backgroundColor = "var(--weak-color)";
  } else if (strengthScore <= 70) {
    strengthLabel.textContent = "Medium";
    strengthBar.style.backgroundColor = "var(--medium-color)";
  } else {
    strengthLabel.textContent = "Strong";
    strengthBar.style.backgroundColor = "var(--strong-color)";
  }
}

copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => {
      showCopySuccess();
    })
    .catch((error) => {
      console.log("Could not copy:", error);
    });
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
  }, 1500);
}
