document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 CloudDock IDE Loaded");

    // Handle signup form submission
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            console.log("Submitting signup:", { username, email, password });

            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            console.log("Signup response:", data);

            if (data.message === "Registration successful") {
                alert("Signup successful! Please log in.");
                window.location.href = "login.html";
            } else {
                alert("Signup failed! " + (data.message || "Email may already be in use."));
            }
        });
    }
});
