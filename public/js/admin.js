document.getElementById("adminLoginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    // Check if username and password are provided
    if (!username || !password) {
        alert("⚠️ Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem("admin-token", result.token); // Store the token securely
            alert("✅ Admin login successful!");
            window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
        } else {
            alert("❌ " + result.message); // Display server message if login fails
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("⚠️ Server error, please try again later.");
    }
});
