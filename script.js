// Secure Client Management System — form validation
//
// Validation happens client-side as a first layer of defence. In a real
// system the same checks would be repeated on the server, because
// client-side checks can be bypassed.

const form = document.getElementById("clientForm");

// A simple email shape check: something @ something . something, no spaces.
// Full RFC-compliant email validation is famously complex; for a prototype
// this catches the common malformed inputs (missing @, missing domain).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");
    error.textContent = message;
    input.classList.toggle("invalid", message !== "");
}

function validateName(name) {
    if (name === "") return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    return "";
}

function validateEmail(email) {
    if (email === "") return "Email is required";
    if (!EMAIL_PATTERN.test(email)) return "Enter a valid email, e.g. name@example.com";
    return "";
}

form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop the page refreshing / submitting anywhere

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    const nameError = validateName(name);
    const emailError = validateEmail(email);

    setError("name", nameError);
    setError("email", emailError);

    const success = document.getElementById("formSuccess");
    if (nameError || emailError) {
        success.textContent = "";
        return;
    }

    success.textContent = "Client details are valid.";
    form.reset();
});
