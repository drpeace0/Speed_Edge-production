import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// ============================================================
// SPEED-EDGE — FIREBASE CONFIGURATION
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
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ============================================================
// GET HTML ELEMENTS
// ============================================================

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


// ============================================================
// CHECK THAT REQUIRED HTML ELEMENTS EXIST
// ============================================================

const requiredElements = {
  welcomeScreen,
  loginScreen,
  signupScreen,
  signInBtn,
  createAccountBtn,
  backFromLogin,
  backFromSignup,
  loginForm,
  signupForm,
  loginMessage,
  signupMessage,
  loginEmail,
  loginPassword,
  signupName,
  signupEmail,
  signupPassword
};

for (const [name, element] of Object.entries(requiredElements)) {
  if (!element) {
    console.error(`SPEED-EDGE: Missing HTML element: ${name}`);
  }
}


// ============================================================
// SCREEN NAVIGATION
// ============================================================

function showScreen(screen) {
  if (!welcomeScreen || !loginScreen || !signupScreen || !screen) {
    console.error("SPEED-EDGE: Screen navigation error.");
    return;
  }

  welcomeScreen.classList.add("hidden");
  loginScreen.classList.add("hidden");
  signupScreen.classList.add("hidden");

  screen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ============================================================
// OPEN LOGIN SCREEN
// ============================================================

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


// ============================================================
// OPEN CREATE ACCOUNT SCREEN
// ============================================================

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


// ============================================================
// BACK FROM LOGIN
// ============================================================

if (backFromLogin) {
  backFromLogin.addEventListener("click", () => {

    if (loginMessage) {
      loginMessage.textContent = "";
      loginMessage.style.color = "";
    }

    showScreen(welcomeScreen);
  });
}


// ============================================================
// BACK FROM SIGNUP
// ============================================================

if (backFromSignup) {
  backFromSignup.addEventListener("click", () => {

    if (signupMessage) {
      signupMessage.textContent = "";
      signupMessage.style.color = "";
    }

    showScreen(welcomeScreen);
  });
}


// ============================================================
// FIREBASE ERROR HANDLING
// ============================================================

function getFriendlyError(error) {

  console.error("==========================================");
  console.error("SPEED-EDGE FIREBASE ERROR");
  console.error("Error code:", error?.code);
  console.error("Error message:", error?.message);
  console.error("Full error:", error);
  console.error("==========================================");

  const code = error?.code || "unknown";
  const message = error?.message || "No additional information.";

  switch (code) {

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
      return "The Firebase API key is not valid or is restricted incorrectly.";

    case "auth/invalid-api-key":
      return "The Firebase API key is invalid.";

    case "auth/app-not-authorized":
      return "This website is not authorized in Firebase. Check Authorized domains.";

    case "auth/unauthorized-domain":
      return "This website domain is not authorized in Firebase.";

    case "auth/internal-error":
      return "Firebase returned an internal error. Please try again.";

    case "auth/invalid-argument":
      return "Firebase received invalid information. Please check the form.";

    case "auth/missing-password":
      return "Please enter your password.";

    case "auth/missing-email":
      return "Please enter your email address.";

    default:
      return `Firebase error: ${code} — ${message}`;
  }
}


// ============================================================
// CREATE ACCOUNT
// ============================================================

if (signupForm) {

  signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("SPEED-EDGE: Create Account button pressed.");

    if (signupMessage) {
      signupMessage.textContent = "Creating your account...";
      signupMessage.style.color = "";
    }

    const name = signupName?.value.trim() || "";
    const email = signupEmail?.value.trim() || "";
    const password = signupPassword?.value || "";


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // CREATE FIREBASE ACCOUNT
    // --------------------------------------------------------

    try {

      console.log("SPEED-EDGE: Connecting to Firebase...");
      console.log("Email:", email);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );


      // ------------------------------------------------------
      // SAVE USER'S NAME
      // ------------------------------------------------------

      await updateProfile(userCredential.user, {
        displayName: name
      });


      console.log(
        "SPEED-EDGE: Account successfully created."
      );

      console.log(
        "User UID:",
        userCredential.user.uid
      );


      if (signupMessage) {
        signupMessage.textContent =
          "Account created successfully! Welcome to SPEED-EDGE.";

        signupMessage.style.color = "#166534";
      }


      // ------------------------------------------------------
      // RETURN TO WELCOME SCREEN
      // ------------------------------------------------------

      setTimeout(() => {
        showScreen(welcomeScreen);
      }, 1500);

    }

    catch (error) {

      console.error(
        "SPEED-EDGE: Account creation failed.",
        error
      );

      if (signupMessage) {
        signupMessage.textContent =
          getFriendlyError(error);

        signupMessage.style.color = "#b42318";
      }
    }

  });

}


// ============================================================
// SIGN IN
// ============================================================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("SPEED-EDGE: Sign In button pressed.");

    if (loginMessage) {
      loginMessage.textContent = "Signing you in...";
      loginMessage.style.color = "";
    }

    const email = loginEmail?.value.trim() || "";
    const password = loginPassword?.value || "";


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!email || !password) {

      loginMessage.textContent =
        "Please enter your email and password.";

      loginMessage.style.color = "#b42318";

      return;
    }


    // --------------------------------------------------------
    // SIGN IN
    // --------------------------------------------------------

    try {

      console.log("SPEED-EDGE: Connecting to Firebase...");

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );


      console.log(
        "SPEED-EDGE: User successfully signed in."
      );

      console.log(
        "User UID:",
        userCredential.user.uid
      );


      if (loginMessage) {

        loginMessage.textContent =
          "Login successful! Welcome back.";

        loginMessage.style.color = "#166534";
      }


      // ------------------------------------------------------
      // RETURN TO WELCOME SCREEN
      // ------------------------------------------------------

      setTimeout(() => {
        showScreen(welcomeScreen);
      }, 1500);

    }

    catch (error) {

      console.error(
        "SPEED-EDGE: Sign in failed.",
        error
      );

      if (loginMessage) {

        loginMessage.textContent =
          getFriendlyError(error);

        loginMessage.style.color = "#b42318";
      }
    }

  });

}


// ============================================================
// FIREBASE AUTHENTICATION STATE
// ============================================================

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("==========================================");
    console.log("SPEED-EDGE: USER IS SIGNED IN");
    console.log("UID:", user.uid);
    console.log("Email:", user.email);
    console.log("Name:", user.displayName);
    console.log("==========================================");

  } else {

    console.log(
      "SPEED-EDGE: No user is currently signed in."
    );
  }

});
