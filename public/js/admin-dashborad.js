// Function to fetch and display users
function manageUsers() {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("admin-token")}`
    };

    fetch("/api/admin/users", { headers })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const userList = document.getElementById("userList");
                userList.innerHTML = ""; // Clear previous entries

                data.users.forEach(user => {
                    const row = document.createElement("tr");

                    // User Details
                    row.innerHTML = `
                        <td>${user.fullName}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="deleteUser('${user._id}')">🗑 Delete</button>
                        </td>
                    `;

                    userList.appendChild(row);
                });

                document.getElementById("userSection").style.display = "block";
                document.getElementById("logContainer").style.display = "none"; // Hide logs if shown
            } else {
                alert("Error fetching users.");
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            alert("Failed to load users.");
        });
}

// Function to delete a user
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("admin-token")}`
        };

        fetch(`/api/admin/users/${userId}`, { 
            method: "DELETE", 
            headers 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("User deleted successfully.");
                manageUsers(); // Refresh user list
            } else {
                alert("Failed to delete user.");
            }
        })
        .catch(error => {
            console.error("Error deleting user:", error);
            alert("Error deleting user.");
        });
    }
}

// Function to fetch and display system logs
function viewLogs() {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("admin-token")}`
    };

    fetch("/api/admin/logs", { headers })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("logData").innerText = data.logs.join("\n") || "No logs available.";
                document.getElementById("logContainer").style.display = "block";
                document.getElementById("userSection").style.display = "none"; // Hide users if shown
            } else {
                alert("Error fetching logs.");
            }
        })
        .catch(error => {
            console.error("Error fetching logs:", error);
            alert("Failed to load logs.");
        });
}

// Function to handle logout
function logout() {
    fetch("/logout")
        .then(() => {
            localStorage.removeItem("admin-token"); // Clear admin token
            alert("Logged out successfully.");
            window.location.href = "/admin-login"; // Redirect to admin login page
        })
        .catch(error => {
            console.error("Logout error:", error);
            alert("Error logging out.");
        });
}

// Load users on page load
document.addEventListener("DOMContentLoaded", () => manageUsers());
