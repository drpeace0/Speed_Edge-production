import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ==================================================
// SPEED-EDGE FIREBASE CONFIGURATION
// ==================================================

const firebaseConfig = {
  apiKey: "AIzaSyAOh1ZWCr8zR-09Rol9JQa4Vnp07VMMA_U",
  authDomain: "speed-edge-logistics.firebaseapp.com",
  projectId: "speed-edge-logistics",
  storageBucket: "speed-edge-logistics.firebasestorage.app",
  messagingSenderId: "476368822322",
  appId: "1:476368822322:web:c7e089ac7c418fa54f1c2b",
  measurementId: "G-SY7CD8EP3K"
};

// ==================================================
// INITIALIZE FIREBASE
// ==================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==================================================
// START AFTER HTML IS READY
// ==================================================

document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // GET AUTHENTICATION SCREENS
  // ==================================================

  const welcomeScreen = document.getElementById("welcomeScreen");
  const loginScreen = document.getElementById("loginScreen");
  const signupScreen = document.getElementById("signupScreen");

  // ==================================================
  // GET BUTTONS
  // ==================================================

  const signInBtn = document.getElementById("signInBtn");
  const createAccountBtn = document.getElementById("createAccountBtn");

  const backFromLogin = document.getElementById("backFromLogin");
  const backFromSignup = document.getElementById("backFromSignup");

  // ==================================================
  // GET FORMS
  // ==================================================

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // ==================================================
  // GET MESSAGES
  // ==================================================

  const loginMessage = document.getElementById("loginMessage");
  const signupMessage = document.getElementById("signupMessage");

  // ==================================================
  // GET LOGIN INPUTS
  // ==================================================

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  // ==================================================
  // GET SIGNUP INPUTS
  // ==================================================

  const signupName = document.getElementById("signupName");
  const signupEmail = document.getElementById("signupEmail");
  const signupPassword = document.getElementById("signupPassword");

  // ==================================================
  // FIND MAIN SPEED-EDGE INTERFACE
  // ==================================================
  //
  // The code checks several possible IDs.
  // This allows the app to work with different
  // dashboard/main-screen names.
  //
  // ==================================================

  const possibleMainScreens = [
    "dashboardScreen",
    "mainScreen",
    "appScreen",
    "homeScreen",
    "dashboard",
    "mainInterface",
    "mainApp",
    "appInterface"
  ];

  function findMainScreen() {

    for (const id of possibleMainScreens) {

      const element = document.getElementById(id);

      if (element) {
        console.log(
          "SPEED-EDGE main interface found:",
          id
        );

        return element;
      }
    }

    console.warn(
      "SPEED-EDGE: No main interface ID was found."
    );

    return null;
  }

  // ==================================================
  // SHOW AUTH SCREEN
  // ==================================================

  function showScreen(screen) {

    if (welcomeScreen) {
      welcomeScreen.classList.add("hidden");
    }

    if (loginScreen) {
      loginScreen.classList.add("hidden");
    }

    if (signupScreen) {
      signupScreen.classList.add("hidden");
    }

    const mainScreen = findMainScreen();

    if (mainScreen) {
      mainScreen.classList.add("hidden");
    }

    if (screen) {
      screen.classList.remove("hidden");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // ==================================================
  // SHOW MAIN INTERFACE
  // ==================================================

  function showMainInterface() {

    const mainScreen = findMainScreen();

    // ----------------------------------------------
    // Hide authentication screens
    // ----------------------------------------------

    if (welcomeScreen) {
      welcomeScreen.classList.add("hidden");
    }

    if (loginScreen) {
      loginScreen.classList.add("hidden");
    }

    if (signupScreen) {
      signupScreen.classList.add("hidden");
    }

    // ----------------------------------------------
    // Show main application
    // ----------------------------------------------

    if (mainScreen) {

      mainScreen.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      console.log(
        "SPEED-EDGE: Main interface opened successfully."
      );

      return true;
    }

    // ----------------------------------------------
    // If no main screen exists yet
    // ----------------------------------------------

    console.warn(
      "SPEED-EDGE: Login succeeded, but no main interface was found in index.html."
    );

    if (welcomeScreen) {
      welcomeScreen.classList.remove("hidden");
    }

    return false;
  }

  // ==================================================
  // OPEN LOGIN
  // ==================================================

  if (signInBtn) {

    signInBtn.addEventListener("click", () => {

      if (loginMessage) {
        loginMessage.textContent = "";
        loginMessage.style.color = "";
      }

      if (loginForm) {
        loginForm.reset();
      }

      showScreen(loginScreen);
    });
  }

  // ==================================================
  // OPEN CREATE ACCOUNT
  // ==================================================

  if (createAccountBtn) {

    createAccountBtn.addEventListener("click", () => {

      if (signupMessage) {
        signupMessage.textContent = "";
        signupMessage.style.color = "";
      }

      if (signupForm) {
        signupForm.reset();
      }

      showScreen(signupScreen);
    });
  }

  // ==================================================
  // BACK FROM LOGIN
  // ==================================================

  if (backFromLogin) {

    backFromLogin.addEventListener("click", () => {

      if (loginMessage) {
        loginMessage.textContent = "";
        loginMessage.style.color = "";
      }

      if (loginForm) {
        loginForm.reset();
      }

      showScreen(welcomeScreen);
    });
  }

  // ==================================================
  // BACK FROM SIGNUP
  // ==================================================

  if (backFromSignup) {

    backFromSignup.addEventListener("click", () => {

      if (signupMessage) {
        signupMessage.textContent = "";
        signupMessage.style.color = "";
      }

      if (signupForm) {
        signupForm.reset();
      }

      showScreen(welcomeScreen);
    });
  }

  // ==================================================
  // FIREBASE ERROR HANDLING
  // ==================================================

  function getFriendlyError(error) {

    console.error(
      "========== SPEED-EDGE FIREBASE ERROR =========="
    );

    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error:", error);

    console.error(
      "==============================================="
    );

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
        return "Firebase could not connect. Please check your internet connection and Firebase settings.";

      case "auth/too-many-requests":
        return "Too many attempts. Please wait and try again later.";

      case "auth/operation-not-allowed":
        return "Email/password authentication is not enabled in Firebase.";

      case "auth/api-key-not-valid":
        return "The Firebase API key is not valid.";

      case "auth/invalid-api-key":
        return "The Firebase API key is invalid.";

      case "auth/app-not-authorized":
        return "This website is not authorized in Firebase.";

      case "auth/unauthorized-domain":
        return "This website domain is not authorized in Firebase.";

      case "auth/internal-error":
        return "Firebase returned an internal error. Please try again.";

      default:
        return (
          "Firebase error: " +
          (error.code || "unknown") +
          ". Please check Firebase settings."
        );
    }
  }

  // ==================================================
  // CREATE ACCOUNT
  // ==================================================

  if (signupForm) {

    signupForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        if (signupMessage) {
          signupMessage.textContent =
            "Creating your account...";

          signupMessage.style.color = "";
        }

        const name =
          signupName ? signupName.value.trim() : "";

        const email =
          signupEmail ? signupEmail.value.trim() : "";

        const password =
          signupPassword ? signupPassword.value : "";

        // --------------------------------------------
        // VALIDATE NAME
        // --------------------------------------------

        if (!name) {

          signupMessage.textContent =
            "Please enter your full name.";

          signupMessage.style.color = "#b42318";

          return;
        }

        // --------------------------------------------
        // VALIDATE EMAIL
        // --------------------------------------------

        if (!email) {

          signupMessage.textContent =
            "Please enter your email address.";

          signupMessage.style.color = "#b42318";

          return;
        }

        // --------------------------------------------
        // VALIDATE PASSWORD
        // --------------------------------------------

        if (password.length < 6) {

          signupMessage.textContent =
            "Your password must contain at least 6 characters.";

          signupMessage.style.color = "#b42318";

          return;
        }

        // --------------------------------------------
        // CREATE FIREBASE ACCOUNT
        // --------------------------------------------

        try {

          const userCredential =
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

          // ------------------------------------------
          // SAVE USER NAME
          // ------------------------------------------

          await updateProfile(
            userCredential.user,
            {
              displayName: name
            }
          );

          console.log(
            "SPEED-EDGE account created:",
            userCredential.user.uid
          );

          if (signupMessage) {

            signupMessage.textContent =
              "Account created successfully! Welcome to SPEED-EDGE.";

            signupMessage.style.color = "#166534";
          }

          // ------------------------------------------
          // OPEN MAIN INTERFACE
          // ------------------------------------------

          setTimeout(() => {
            showMainInterface();
          }, 1000);

        } catch (error) {

          if (signupMessage) {

            signupMessage.textContent =
              getFriendlyError(error);

            signupMessage.style.color = "#b42318";
          }
        }
      }
    );
  }

  // ==================================================
  // SIGN IN
  // ==================================================

  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        if (loginMessage) {

          loginMessage.textContent =
            "Signing you in...";

          loginMessage.style.color = "";
        }

        const email =
          loginEmail ? loginEmail.value.trim() : "";

        const password =
          loginPassword ? loginPassword.value : "";

        // --------------------------------------------
        // VALIDATE
        // --------------------------------------------

        if (!email || !password) {

          if (loginMessage) {

            loginMessage.textContent =
              "Please enter your email and password.";

            loginMessage.style.color = "#b42318";
          }

          return;
        }

        // --------------------------------------------
        // SIGN IN
        // --------------------------------------------

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

          if (loginMessage) {

            loginMessage.textContent =
              "Login successful! Welcome back.";

            loginMessage.style.color = "#166534";
          }

          // ------------------------------------------
          // IMPORTANT:
          // DO NOT RETURN TO WELCOME SCREEN.
          //
          // Open the main SPEED-EDGE interface.
          // ------------------------------------------

          setTimeout(() => {
            showMainInterface();
          }, 800);

        } catch (error) {

          if (loginMessage) {

            loginMessage.textContent =
              getFriendlyError(error);

            loginMessage.style.color = "#b42318";
          }
        }
      }
    );
  }

  // ==================================================
  // AUTHENTICATION STATE
  // ==================================================

  onAuthStateChanged(auth, (user) => {

    if (user) {

      console.log(
        "SPEED-EDGE authenticated user:",
        {
          uid: user.uid,
          email: user.email,
          name: user.displayName
        }
      );

    } else {

      console.log(
        "No SPEED-EDGE user is currently signed in."
      );
    }
  });

});
