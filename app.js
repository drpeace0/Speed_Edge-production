// ============================================================
// SPEED-EDGE LOGISTICS
// COMPLETE FIREBASE AUTHENTICATION + DASHBOARD CONTROLLER
// ============================================================

import {
  initializeApp,
  getApps,
  getApp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAOh1ZWCr8zR-09Rol9JQa4Vnp07VMMA_U",
  authDomain: "speed-edge-logistics.firebaseapp.com",
  projectId: "speed-edge-logistics",
  storageBucket: "speed-edge-logistics.firebasestorage.app",
  messagingSenderId: "476368822322",
  appId: "1:476368822322:web:c7e089ac7c418fa54f1c2b",
  measurementId: "G-SY7CD8EP3K"
};

// ============================================================
// INITIALIZE FIREBASE SAFELY
// ============================================================

let app;

try {
  // Re-use an existing Firebase app if index.html already
  // initialized Firebase.
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

const auth = getAuth(app);

// ============================================================
// GET ELEMENTS
// ============================================================

const welcomeScreen = document.getElementById("welcomeScreen");
const loginScreen = document.getElementById("loginScreen");
const signupScreen = document.getElementById("signupScreen");

// Existing logged-in dashboard
const dashboardApp = document.getElementById("app");

// Login buttons
const signInBtn = document.getElementById("signInBtn");
const createAccountBtn = document.getElementById("createAccountBtn");

// Back buttons
const backFromLogin = document.getElementById("backFromLogin");
const backFromSignup = document.getElementById("backFromSignup");

// Forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Messages
const loginMessage =
  document.getElementById("loginMessage") ||
  document.getElementById("loginError");

const signupMessage =
  document.getElementById("signupMessage") ||
  document.getElementById("signupError");

// Login fields
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

// Signup fields
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

// Existing dashboard user elements
const userEmailElement =
  document.getElementById("userEmail") ||
  document.getElementById("emailUser");

const logoutBtn =
  document.getElementById("logoutBtn") ||
  document.getElementById("signOutBtn");

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function setMessage(element, message, type = "error") {
  if (!element) return;

  element.textContent = message;

  if (type === "success") {
    element.style.color = "#166534";
  } else if (type === "info") {
    element.style.color = "#475467";
  } else {
    element.style.color = "#b42318";
  }
}

function clearMessage(element) {
  if (!element) return;

  element.textContent = "";
  element.style.color = "";
}

// ============================================================
// SHOW / HIDE SCREENS
// ============================================================

function hideAllScreens() {
  if (welcomeScreen) {
    welcomeScreen.classList.add("hidden");
  }

  if (loginScreen) {
    loginScreen.classList.add("hidden");
  }

  if (signupScreen) {
    signupScreen.classList.add("hidden");
  }
}

// ============================================================
// SHOW WELCOME SCREEN
// ============================================================

function showWelcomeScreen() {
  hideAllScreens();

  if (dashboardApp) {
    dashboardApp.classList.add("hidden");
  }

  if (welcomeScreen) {
    welcomeScreen.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ============================================================
// SHOW LOGIN SCREEN
// ============================================================

function showLoginScreen() {
  hideAllScreens();

  if (dashboardApp) {
    dashboardApp.classList.add("hidden");
  }

  if (loginScreen) {
    loginScreen.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ============================================================
// SHOW SIGNUP SCREEN
// ============================================================

function showSignupScreen() {
  hideAllScreens();

  if (dashboardApp) {
    dashboardApp.classList.add("hidden");
  }

  if (signupScreen) {
    signupScreen.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ============================================================
// SHOW DASHBOARD
// ============================================================

function showDashboard(user) {
  console.log("Opening SPEED-EDGE dashboard...");

  // Hide all login/welcome screens
  hideAllScreens();

  // THIS IS THE IMPORTANT PART:
  // Show the existing <section id="app" class="hidden">
  if (dashboardApp) {
    dashboardApp.classList.remove("hidden");
  } else {
    console.error(
      'Dashboard element <section id="app"> was not found.'
    );
  }

  // Display logged-in email if the element exists
  if (userEmailElement && user) {
    userEmailElement.textContent = user.email || "";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ============================================================
// WELCOME PAGE BUTTONS
// ============================================================

if (signInBtn) {
  signInBtn.addEventListener("click", function (event) {
    event.preventDefault();

    clearMessage(loginMessage);

    if (loginForm) {
      loginForm.reset();
    }

    showLoginScreen();
  });
}

if (createAccountBtn) {
  createAccountBtn.addEventListener("click", function (event) {
    event.preventDefault();

    clearMessage(signupMessage);

    if (signupForm) {
      signupForm.reset();
    }

    showSignupScreen();
  });
}

// ============================================================
// BACK BUTTONS
// ============================================================

if (backFromLogin) {
  backFromLogin.addEventListener("click", function (event) {
    event.preventDefault();

    clearMessage(loginMessage);

    showWelcomeScreen();
  });
}

if (backFromSignup) {
  backFromSignup.addEventListener("click", function (event) {
    event.preventDefault();

    clearMessage(signupMessage);

    showWelcomeScreen();
  });
}

// ============================================================
// FIREBASE ERROR TRANSLATION
// ============================================================

function getFriendlyError(error) {
  console.error("================================");
  console.error("SPEED-EDGE FIREBASE ERROR");
  console.error("Code:", error.code);
  console.error("Message:", error.message);
  console.error(error);
  console.error("================================");

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email address.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Your password must contain at least 6 characters.";

    case "auth/invalid-credential":
      return "The email or password is incorrect.";

    case "auth/user-not-found":
      return "No account was found with this email address.";

    case "auth/wrong-password":
      return "The password is incorrect.";

    case "auth/network-request-failed":
      return "Firebase could not connect. Please check your internet connection and Firebase settings.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again later.";

    case "auth/operation-not-allowed":
      return "Email/password authentication is not enabled in Firebase.";

    case "auth/api-key-not-valid":
      return "The Firebase API key is not valid or is restricted incorrectly.";

    case "auth/app-not-authorized":
      return "This website is not authorized in Firebase. Check Authorized Domains.";

    case "auth/invalid-api-key":
      return "The Firebase API key is invalid.";

    case "auth/internal-error":
      return "Firebase returned an internal error. Please try again.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/invalid-login-credentials":
      return "The email or password is incorrect.";

    default:
      return (
        "Firebase error: " +
        (error.code || "unknown error")
      );
  }
}

// ============================================================
// CREATE ACCOUNT
// ============================================================

if (signupForm) {
  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearMessage(signupMessage);

    const name = signupName
      ? signupName.value.trim()
      : "";

    const email = signupEmail
      ? signupEmail.value.trim()
      : "";

    const password = signupPassword
      ? signupPassword.value
      : "";

    // Validation
    if (!name) {
      setMessage(
        signupMessage,
        "Please enter your full name."
      );
      return;
    }

    if (!email) {
      setMessage(
        signupMessage,
        "Please enter your email address."
      );
      return;
    }

    if (password.length < 6) {
      setMessage(
        signupMessage,
        "Your password must contain at least 6 characters."
      );
      return;
    }

    setMessage(
      signupMessage,
      "Creating your account...",
      "info"
    );

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Save full name
      if (user) {
        await updateProfile(user, {
          displayName: name
        });
      }

      console.log(
        "SPEED-EDGE account created:",
        user.uid
      );

      setMessage(
        signupMessage,
        "Account created successfully! Welcome to SPEED-EDGE.",
        "success"
      );

      // New users go directly into the dashboard
      setTimeout(function () {
        showDashboard(user);
      }, 800);

    } catch (error) {
      setMessage(
        signupMessage,
        getFriendlyError(error)
      );
    }
  });
}

// ============================================================
// SIGN IN
// ============================================================

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    clearMessage(loginMessage);

    const email = loginEmail
      ? loginEmail.value.trim()
      : "";

    const password = loginPassword
      ? loginPassword.value
      : "";

    // Validation
    if (!email || !password) {
      setMessage(
        loginMessage,
        "Please enter your email and password."
      );
      return;
    }

    setMessage(
      loginMessage,
      "Signing you in...",
      "info"
    );

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      console.log(
        "SPEED-EDGE login successful:",
        user.uid
      );

      setMessage(
        loginMessage,
        "Login successful! Opening your dashboard...",
        "success"
      );

      // =====================================================
      // IMPORTANT:
      // DO NOT GO BACK TO welcomeScreen.
      // OPEN THE EXISTING DASHBOARD.
      // =====================================================

      setTimeout(function () {
        showDashboard(user);
      }, 500);

    } catch (error) {
      setMessage(
        loginMessage,
        getFriendlyError(error)
      );
    }
  });
}

// ============================================================
// SIGN OUT
// ============================================================

if (logoutBtn) {
  logoutBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
      await signOut(auth);

      console.log("SPEED-EDGE user signed out.");

      showWelcomeScreen();

    } catch (error) {
      console.error(
        "SPEED-EDGE sign-out error:",
        error
      );
    }
  });
}

// ============================================================
// DASHBOARD TAB NAVIGATION
// ============================================================

const tabButtons = document.querySelectorAll(
  "[data-tab]"
);

const tabSections = document.querySelectorAll(
  "#app .tab"
);

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const targetTab =
      button.getAttribute("data-tab");

    if (!targetTab) {
      return;
    }

    // Remove active state from all tab buttons
    tabButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Hide all dashboard sections
    tabSections.forEach(function (section) {
      section.classList.add("hidden");
    });

    // Activate clicked button
    button.classList.add("active");

    // Show selected section
    const targetSection =
      document.getElementById(targetTab);

    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// ============================================================
// AUTHENTICATION STATE
// ============================================================

onAuthStateChanged(auth, function (user) {

  if (user) {

    console.log("SPEED-EDGE authenticated user:", {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    });

    // If the user is already logged in when the page opens,
    // take them directly to the dashboard.
    showDashboard(user);

  } else {

    console.log(
      "No SPEED-EDGE user is currently signed in."
    );

    // Only show welcome page if the dashboard is not supposed
    // to remain visible for an authenticated user.
    showWelcomeScreen();
  }
});

// ============================================================
// STARTUP MESSAGE
// ============================================================

console.log(
  "SPEED-EDGE authentication controller loaded successfully."
);
