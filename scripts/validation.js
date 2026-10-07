const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const country = document.getElementById("country");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

const successCard = document.getElementById("successCard");
const successName = document.getElementById("successName");
const successEmail = document.getElementById("successEmail");
const successPhone = document.getElementById("successPhone");
const successCountry = document.getElementById("successCountry");
const newRegistrationBtn = document.getElementById("newRegistrationBtn");
const countdownText = document.getElementById("countdownText");
const viewUsersBtn = document.getElementById("viewUsersBtn");
const usersSection = document.getElementById("usersSection");
const usersTableBody = document.querySelector("#usersTable tbody");
let countdownInterval;


// Regex Validation Functions
// =========================

function isValidName(name) {
    return /^[A-Za-z\s]{3,}$/.test(name.trim());
}

function isValidEmail(emailAddress) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim());
}

function isValidPhone(phoneNumber) {
    return /^[6-9]\d{9}$/.test(phoneNumber.trim());
}

function isValidPassword(passwordValue) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordValue);
}

// =========================
// Password Strength
// =========================

function updateRule(element, valid, text) {

    if (valid) {
        element.textContent = "✅ " + text;
        element.classList.add("valid");
    } else {
        element.textContent = "❌ " + text;
        element.classList.remove("valid");
    }

}

function updatePasswordStrength(passwordValue) {

    let score = 0;

    const hasLength = passwordValue.length >= 8;
    const hasUpper = /[A-Z]/.test(passwordValue);
    const hasLower = /[a-z]/.test(passwordValue);
    const hasNumber = /\d/.test(passwordValue);
    const hasSpecial = /[@$!%*?&]/.test(passwordValue);

    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    updateRule(lengthCheck, hasLength, "At least 8 characters");
    updateRule(uppercaseCheck, hasUpper, "One uppercase letter");
    updateRule(lowercaseCheck, hasLower, "One lowercase letter");
    updateRule(numberCheck, hasNumber, "One number");
    updateRule(specialCheck, hasSpecial, "One special character");

    if (passwordValue.length === 0) {
        strengthFill.style.width = "0%";
        strengthFill.style.background = "#d1d5db";
        strengthText.textContent = "Password Strength";
        return;
    }

    if (score <= 2) {
        strengthFill.style.width = "33%";
        strengthFill.style.background = "#ef4444";
        strengthText.textContent = "Weak 🔴";
    } else if (score <= 4) {
        strengthFill.style.width = "66%";
        strengthFill.style.background = "#f59e0b";
        strengthText.textContent = "Medium 🟠";
    } else {
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Strong 🟢";
    }

}

// =========================
// DOM Helper Functions
// =========================

function showError(input, message) {

    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error");

    error.textContent = message;

    input.classList.remove("success");
    input.classList.add("invalid");

}

function showSuccess(input) {

    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error");

    error.textContent = "";

    input.classList.remove("invalid");
    input.classList.add("success");

}

function clearValidation(input) {

    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error");

    error.textContent = "";

    input.classList.remove("invalid");
    input.classList.remove("success");

}

// =========================
// Validation Functions
// =========================

function validateName() {

    const value = fullName.value.trim();

    if (value === "") {
        showError(fullName, "Full name is required.");
        return false;
    }

    if (!isValidName(value)) {
        showError(fullName, "Enter at least 3 alphabetic characters.");
        return false;
    }

    showSuccess(fullName);
    return true;

}

function validateEmail() {

    const value = email.value.trim();

    if (value === "") {
        showError(email, "Email is required.");
        return false;
    }

    if (!isValidEmail(value)) {
        showError(email, "Enter a valid email address.");
        return false;
    }

    showSuccess(email);
    return true;

}
function validatePhone() {

    const value = phone.value.trim();

    if (value === "") {
        showError(phone, "Phone number is required.");
        return false;
    }

    if (!isValidPhone(value)) {
        showError(phone, "Enter a valid 10-digit Indian phone number.");
        return false;
    }

    showSuccess(phone);
    return true;

}

function validatePassword() {

    const value = password.value;

    if (value === "") {
        showError(password, "Password is required.");
        return false;
    }

    if (!isValidPassword(value)) {
        showError(
            password,
            "Minimum 8 characters with uppercase, lowercase, number and special character."
        );
        return false;
    }

    showSuccess(password);
    return true;

}

function validateConfirmPassword() {

    const value = confirmPassword.value;

    if (value === "") {
        showError(confirmPassword, "Please confirm your password.");
        return false;
    }

    if (value !== password.value) {
        showError(confirmPassword, "Passwords do not match.");
        return false;
    }

    showSuccess(confirmPassword);
    return true;

}

function validateCountry() {

    if (country.value === "") {
        showError(country, "Please select a country.");
        return false;
    }

    showSuccess(country);
    return true;

}

// =========================
// Real-Time Validation
// =========================

fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);

password.addEventListener("input", () => {

    validatePassword();
    updatePasswordStrength(password.value);
    validateConfirmPassword();

});

confirmPassword.addEventListener("input", validateConfirmPassword);
country.addEventListener("change", validateCountry);

// =========================
// Form Submit
// =========================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const isFormValid =
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateCountry();

    if (!isFormValid) return;

const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");
const loader = submitBtn.querySelector(".loader");

submitBtn.disabled = true;

btnText.style.display = "none";
loader.style.display = "inline-block";

setTimeout(() => {

    successName.textContent = fullName.value;
    successEmail.textContent = email.value;

    const phoneValue = phone.value;
    successPhone.textContent =
        "******" + phoneValue.slice(-4);

    
const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

users.push({
    name: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    country: country.value
});

localStorage.setItem(
    "registeredUsers",
    JSON.stringify(users)
);

renderUsers();
    form.style.display = "none";
    successCard.style.display = "block";
    let seconds = 5;

countdownText.textContent =
    `Returning to registration form in ${seconds} seconds...`;

clearInterval(countdownInterval);

countdownInterval = setInterval(() => {

    seconds--;

    countdownText.textContent =
        `Returning to registration form in ${seconds} seconds...`;

    if (seconds <= 0) {

        clearInterval(countdownInterval);

        newRegistrationBtn.click();

    }

}, 1000);
    

    submitBtn.disabled = false;
    btnText.style.display = "inline";
    loader.style.display = "none";

}, 1500);
setTimeout(() => {

    successName.textContent = fullName.value;
    successEmail.textContent = email.value;

    const phoneValue = phone.value;
    successPhone.textContent =
        "******" + phoneValue.slice(-4);

    successCountry.textContent = country.value;

    form.style.display = "none";
    successCard.style.display = "block";

    submitBtn.disabled = false;
    btnText.style.display = "inline";
    loader.style.display = "none";

}, 1500);

});
// =========================
// Display Registered Users
// =========================

function displayUsers() {

    const users =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

    usersTableBody.innerHTML = "";

    if (users.length === 0) {

        usersTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No registered users found.
                </td>
            </tr>
        `;

        return;
    }

    users.forEach((user, index) => {

           });

    // 👇 Add this here
    document.querySelectorAll(".delete-btn").forEach((button) => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            if (confirm("Are you sure you want to delete this user?")) {

                deleteUser(index);

            }

        });

    });

}


// =========================
// Delete Registered User
// =========================

function deleteUser(index) {

    const users =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

    users.splice(index, 1);

    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(users)
    );

    displayUsers();

}
// =========================
// Register Again
// =========================

newRegistrationBtn.addEventListener("click", () => {

    form.reset();

    document
        .querySelectorAll("input, select")
        .forEach((field) => clearValidation(field));

    updatePasswordStrength("");

    form.style.display = "block";
    successCard.style.display = "none";

});

// =========================
// Show / Hide Password
// =========================

const toggleButtons =
    document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const targetInput =
            document.getElementById(button.dataset.target);

        if (targetInput.type === "password") {

            targetInput.type = "text";
            button.textContent = "🙈";

        } else {

            targetInput.type = "password";
            button.textContent = "👁️";

        }

    });

});
// =========================
// View Registered Users
// =========================

viewUsersBtn.addEventListener("click", () => {

    displayUsers();

    if (usersSection.style.display === "none") {

        usersSection.style.display = "block";
        viewUsersBtn.textContent = "Hide Registered Users";

    } else {

        usersSection.style.display = "none";
        viewUsersBtn.textContent = "View Registered Users";

    }

});
// =========================
// Initial State
// =========================

updatePasswordStrength("");
// =========================
// Render Registered Users
// =========================

function renderUsers() {

    const users =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

    usersTableBody.innerHTML = "";

    users.forEach((user, index) => {

        usersTableBody.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.country}</td>
                <td>
                    <button
                        class="delete-btn"
                        data-index="${index}"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

    document.querySelectorAll(".delete-btn").forEach((button) => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            if (confirm("Delete this user?")) {

                deleteUser(index);

            }

        });

    });

}

// =========================
// Delete User
// =========================

function deleteUser(index) {

    const users =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

    users.splice(index, 1);

    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(users)
    );

    renderUsers();

}