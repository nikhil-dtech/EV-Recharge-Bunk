document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Registered successfully. Please log in.");
        window.location.href = "login.html";
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (err) {
      alert("⚠️ Server error during registration.");
    }
  });
});