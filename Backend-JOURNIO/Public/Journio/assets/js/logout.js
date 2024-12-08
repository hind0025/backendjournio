document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("auth-btn");
    const token = localStorage.getItem("authToken");

    if (token) {
        // User is logged in
        authButton.innerHTML = '<button class="btn btn-primary">Logout</button>';
        authButton.href = "#";

        // Logout Handler
        authButton.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                // Send a logout request to the backend
                const response = await fetch('http://127.0.0.1:5000/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Remove the token from localStorage
                    localStorage.removeItem("authToken");
                    alert("Logged out successfully!");
                    location.reload(); // Reload to update the UI
                } else {
                    const errorData = await response.json();
                    console.error("Logout error:", errorData.message);
                    alert("Failed to logout. Please try again.");
                }
            } catch (err) {
                console.error("Logout error:", err.message);
            }
        });
    } else {
        // User is not logged in
        authButton.innerHTML = '<button class="btn btn-primary">Login</button>';
        authButton.href = "login-page.html";
    }
});
