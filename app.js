const welcomeScreen = document.getElementById("welcomeScreen");
const loginScreen = document.getElementById("loginScreen");
const signupScreen = document.getElementById("signupScreen");

const signInBtn = document.getElementById("signInBtn");
const createAccountBtn = document.getElementById("createAccountBtn");

const backFromLogin = document.getElementById("backFromLogin");
const backFromSignup = document.getElementById("backFromSignup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");

function showScreen(screen) {
  welcomeScreen.classList.add("hidden");
  loginScreen.classList.add("hidden");
  signupScreen.classList.add("hidden");

  screen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

signInBtn.addEventListener("click", () => {
  loginMessage.textContent = "";
  showScreen(loginScreen);
});

createAccountBtn.addEventListener("click", () => {
  signupMessage.textContent = "";
  showScreen(signupScreen);
});

backFromLogin.addEventListener("click", () => {
  showScreen(welcomeScreen);
});

backFromSignup.addEventListener("click", () => {
  showScreen(welcomeScreen);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  loginMessage.textContent =
    "Login interface is working. Firebase authentication will be connected next.";
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  signupMessage.textContent =
    "Account creation interface is working. Firebase will be connected next.";
});
