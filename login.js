const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const errorMessage = document.getElementById("errorMessage");




loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const email = emailInput.value;

    const password = passwordInput.value;


    const correctEmail = "admin@gmail.com";

    const correctPassword = "123456";


    if (email === correctEmail && password === correctPassword) {

        window.location.href = "dashboard.html";

    } else {

        errorMessage.textContent = "Invalid email or password.";

    }

});