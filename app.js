import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// SPEED-EDGE FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAOh1ZWCr8zR-09Rol9JQa4Vnp07VMMA_U",
  authDomain: "speed-edge-logistics.firebaseapp.com",
  projectId: "speed-edge-logistics",
  storageBucket: "speed-edge-logistics.firebasestorage.app",
  messagingSenderId: "476368822322",
  appId: "1:476368822322:web:c7e089ac7c418fa54f1c2b",
  measurementId: "G-SY7CD8EP3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get HTML elements
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

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

// Screen navigation
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

// Sign In button
signInBtn.addEventListener("click", () => {
  loginMessage.textContent = "";
  loginMessage.style.color = "";
  loginForm.reset();

  showScreen(loginScreen);
});

// Create Account button
createAccountBtn.addEventListener("click", () => {
  signupMessage.textContent = "";
  signupMessage.style.color = "";
  signupForm.reset();

  showScreen(signupScreen);
});

// Back buttons
backFromLogin.addEventListener("click", () => {
  loginMessage.textContent = "";
  showScreen(welcomeScreen);
});

backFromSignup.addEventListener("click", () => {
  signupMessage.textContent = "";
  showScreen(welcomeScreen);
});

// Firebase error handling
function getFriendlyError(error) {
  console.error("SPEED-EDGE Firebase error:", error);

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email address.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Your password is too weak. Please use at least 6 characters.";

    case "auth/invalid-credential":
      return "The email or password is incorrect.";

    case "auth/user-not-found":
      return "No account was found with this email address.";

    case "auth/wrong-password":
      return "The password is incorrect.";

    case "auth/network-request-failed":
      return "Firebase could not connect. Please check your connection and Firebase settings.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again later.";

    case "auth/operation-not-allowed":
      return "Email/password authentication is not enabled in Firebase.";

    case "auth/api-key-not-valid":
      return "The Firebase API key is not valid or is restricted incorrectly.";

    case "auth/app-not-authorized":
      return "This website is not authorized in Firebase.";

    case "auth/invalid-api-key":
      return "The Firebase API key is invalid.";

    case "auth/internal-error":
      return "Firebase returned an internal error. Please try again.";

    default:
      return "Firebase error: " + (error.code || "unknown error");
  }
}

// Create Account
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  signupMessage.textContent = "Creating your account...";
  signupMessage.style.color = "";

  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;

  if (!name) {
    signupMessage.textContent = "Please enter your full name.";
    signupMessage.style.color = "#b42318";
    return;
  }

  if (!email) {
    signupMessage.textContent = "Please enter your email address.";
    signupMessage.style.color = "#b42318";
    return;
  }

  if (password.length < 6) {
    signupMessage.textContent =
      "Your password must contain at least 6 characters.";
    signupMessage.style.color = "#b42318";
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(userCredential.user, {
      displayName: name
    });

    console.log(
      "SPEED-EDGE account created:",
      userCredential.user.uid
    );

    signupMessage.textContent =
      "Account created successfully! Welcome to SPEED-EDGE.";

    signupMessage.style.color = "#166534";

    setTimeout(() => {
      showScreen(welcomeScreen);
    }, 1500);

  } catch (error) {
    signupMessage.textContent = getFriendlyError(error);
    signupMessage.style.color = "#b42318";
  }
});

// Sign In
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginMessage.textContent = "Signing you in...";
  loginMessage.style.color = "";

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    loginMessage.textContent =
      "Please enter your email and password.";

    loginMessage.style.color = "#b42318";
    return;
  }

  try {
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    console.log(
      "SPEED-EDGE user signed in:",
      userCredential.user.uid
    );

    loginMessage.textContent =
      "Login successful! Welcome back.";

    loginMessage.style.color = "#166534";

    setTimeout(() => {
      showScreen(welcomeScreen);
    }, 1500);

  } catch (error) {
    loginMessage.textContent = getFriendlyError(error);
    loginMessage.style.color = "#b42318";
  }
});

// Authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Current SPEED-EDGE user:", {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    });
  } else {
    console.log("No SPEED-EDGE user is signed in.");
  }
});
