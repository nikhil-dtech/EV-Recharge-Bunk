const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://ev-recharge-bunk.onrender.com";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        window.location.href = "index.html"; // Redirect to booking page
      } else {
        alert(result.message || "Login failed");
      }
    } catch (err) {
      alert("⚠️ Server error during login.");
    }
  });
});