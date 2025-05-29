document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value;
      const password = document.getElementById("registerPassword").value;
      localStorage.setItem("user", JSON.stringify({ username, password }));
      alert("Registration successful!");
      window.location.href = "index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("loggedIn", true);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials.");
      }
    });
  }
});
