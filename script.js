console.log("Script loaded");

document.getElementById("clientForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stops page refresh

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        alert("Please fill in all fields");
        console.log("Validation failed");
    } else {
        alert("Form submitted successfully");
        console.log("Form submitted:", name, email);
    }
});

