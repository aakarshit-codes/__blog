import { setUser, getUser, removeUser } from "./util.js";

const loginContainer = document.getElementById("login-container");
const usernameInput = document.getElementById("username-input");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const welcomeBanner = document.getElementById("welcome-banner");
const greeting = document.getElementById("greeting");

const showWelcome = (username) => {
  greeting.textContent = `Welcome, ${username}!`;
  welcomeBanner.classList.remove("hidden");
  loginContainer.classList.add("hidden");
};
const showLogin = () => {
  welcomeBanner.classList.add("hidden");
  loginContainer.classList.remove("hidden");
};

const existingUser = getUser();
if (existingUser) {
  showWelcome(existingUser);
} else {
  showLogin();
}

loginBtn?.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  if (username.toLowerCase() === "admin") {
    alert("The username is reserved ");
    return;
  }

  setUser(username);
  showWelcome(username);
});

logoutBtn?.addEventListener("click", () => {
  removeUser();
  location.reload();   
});
