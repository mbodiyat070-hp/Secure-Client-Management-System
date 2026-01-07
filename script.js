const form = document.getElementById("clientForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // stop the page from reloading

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if(name === "" || email === "") {
    alert("Please fill in all fields!");
  } else {
    alert("Form submitted successfully!");
  }
});

