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

// --- Client storage -------------------------------------------------------
// Clients are kept in localStorage so the list survives a page refresh.
// This is a stand-in for a real backend: in production this data would be
// stored server-side behind authentication, never in the browser.

const STORAGE_KEY = "clients";

function loadClients() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return []; // corrupted storage shouldn't break the page
    }
}

function saveClients(clients) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

function renderClients() {
    const clients = loadClients();
    const table = document.getElementById("clientTable");
    const rows = document.getElementById("clientRows");
    const empty = document.getElementById("emptyMessage");

    rows.replaceChildren();
    table.hidden = clients.length === 0;
    empty.hidden = clients.length !== 0;

    clients.forEach(function (client, index) {
        const row = document.createElement("tr");

        // textContent (not innerHTML) so stored values are always treated
        // as plain text — a client named "<script>..." renders harmlessly
        // instead of executing (XSS protection).
        const nameCell = document.createElement("td");
        nameCell.textContent = client.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = client.email;

        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            const updated = loadClients();
            updated.splice(index, 1);
            saveClients(updated);
            renderClients();
        });
        actionCell.appendChild(removeButton);

        row.append(nameCell, emailCell, actionCell);
        rows.appendChild(row);
    });
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

    const clients = loadClients();
    clients.push({ name: name, email: email });
    saveClients(clients);
    renderClients();

    success.textContent = "Client saved.";
    form.reset();
});

renderClients();
