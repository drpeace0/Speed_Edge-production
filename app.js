/* =========================================================
   SPEED-EDGE LOGISTICS
   Firebase Authentication + Persistent Dashboard
   ========================================================= */

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


/* =========================================================
   FIREBASE CONFIGURATION
   ========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAOh1ZWCr8zR-09Rol9JQa4Vnp07VMMA_U",
  authDomain: "speed-edge-logistics.firebaseapp.com",
  projectId: "speed-edge-logistics",
  storageBucket: "speed-edge-logistics.firebasestorage.app",
  messagingSenderId: "476368822322",
  appId: "1:476368822322:web:c7e089ac7c418fa54f1c2b",
  measurementId: "G-SY7CD8EP3K"
};


/* =========================================================
   INITIALIZE FIREBASE
   ========================================================= */

let app = null;
let auth = null;

try {

  app = initializeApp(firebaseConfig);

  auth = getAuth(app);

  console.log(
    "SPEED-EDGE Firebase initialized successfully."
  );

} catch (error) {

  console.error(
    "SPEED-EDGE Firebase initialization failed:",
    error
  );

  alert(
    "SPEED-EDGE could not initialize Firebase. " +
    "Please check the Firebase configuration."
  );

}


/* =========================================================
   GET HTML ELEMENTS
   ========================================================= */

const welcomeScreen =
  document.getElementById("welcomeScreen");

const loginScreen =
  document.getElementById("loginScreen");

const signupScreen =
  document.getElementById("signupScreen");

const dashboardScreen =
  document.getElementById("dashboardScreen");


const signInBtn =
  document.getElementById("signInBtn");

const createAccountBtn =
  document.getElementById("createAccountBtn");

const backFromLogin =
  document.getElementById("backFromLogin");

const backFromSignup =
  document.getElementById("backFromSignup");


const loginForm =
  document.getElementById("loginForm");

const signupForm =
  document.getElementById("signupForm");


const loginMessage =
  document.getElementById("loginMessage");

const signupMessage =
  document.getElementById("signupMessage");


const loginEmail =
  document.getElementById("loginEmail");

const loginPassword =
  document.getElementById("loginPassword");


const signupName =
  document.getElementById("signupName");

const signupEmail =
  document.getElementById("signupEmail");

const signupPassword =
  document.getElementById("signupPassword");


const logoutBtn =
  document.getElementById("logoutBtn");


const dashboardUserEmail =
  document.getElementById("dashboardUserEmail");

const dashboardWelcome =
  document.getElementById("dashboardWelcome");


const profileName =
  document.getElementById("profileName");

const profileEmail =
  document.getElementById("profileEmail");

const profileUid =
  document.getElementById("profileUid");


/* =========================================================
   SCREEN NAVIGATION
   ========================================================= */

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

  if (dashboardScreen) {
    dashboardScreen.classList.add("hidden");
  }

}


function showScreen(screen) {

  hideAllScreens();

  if (screen) {
    screen.classList.remove("hidden");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   FRIENDLY FIREBASE ERRORS
   ========================================================= */

function getFriendlyError(error) {

  console.error(
    "========== SPEED-EDGE FIREBASE ERROR =========="
  );

  console.error(
    "Error code:",
    error?.code
  );

  console.error(
    "Error message:",
    error?.message
  );

  console.error(
    "Full error:",
    error
  );

  console.error(
    "==============================================="
  );


  switch (error?.code) {

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
      return "Firebase could not connect. Please check your internet connection.";

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

    case "auth/persistence-unavailable":
      return "Your browser could not save the login session.";

    default:
      return (
        "Firebase error: " +
        (error?.code || "unknown error")
      );
  }

}


/* =========================================================
   OPEN DASHBOARD
   ========================================================= */

function openDashboard(user) {

  if (!user) {
    return;
  }


  console.log(
    "Opening SPEED-EDGE dashboard for:",
    user.email
  );


  /* -------------------------------------------------------
     USER EMAIL
     ------------------------------------------------------- */

  if (dashboardUserEmail) {

    dashboardUserEmail.textContent =
      user.email || "";

  }


  /* -------------------------------------------------------
     WELCOME MESSAGE
     ------------------------------------------------------- */

  if (dashboardWelcome) {

    const name =
      user.displayName ||
      "Welcome";

    dashboardWelcome.textContent =
      `Welcome, ${name} 👋`;

  }


  /* -------------------------------------------------------
     PROFILE
     ------------------------------------------------------- */

  if (profileName) {

    profileName.textContent =
      user.displayName ||
      "Not provided";

  }


  if (profileEmail) {

    profileEmail.textContent =
      user.email ||
      "Not provided";

  }


  if (profileUid) {

    profileUid.textContent =
      user.uid ||
      "Not available";

  }


  /* -------------------------------------------------------
     DASHBOARD COUNTERS
     ------------------------------------------------------- */

  const totalDeliveries =
    document.getElementById(
      "totalDeliveries"
    );

  const activeRiders =
    document.getElementById(
      "activeRiders"
    );

  const totalCustomers =
    document.getElementById(
      "totalCustomers"
    );

  const pendingDeliveries =
    document.getElementById(
      "pendingDeliveries"
    );


  if (totalDeliveries) {
    totalDeliveries.textContent = "0";
  }

  if (activeRiders) {
    activeRiders.textContent = "0";
  }

  if (totalCustomers) {
    totalCustomers.textContent = "0";
  }

  if (pendingDeliveries) {
    pendingDeliveries.textContent = "0";
  }


  /* -------------------------------------------------------
     FINANCE
     ------------------------------------------------------- */

  const financeCompleted =
    document.getElementById(
      "financeCompleted"
    );

  const financePending =
    document.getElementById(
      "financePending"
    );


  if (financeCompleted) {
    financeCompleted.textContent = "0";
  }

  if (financePending) {
    financePending.textContent = "0";
  }


  /* -------------------------------------------------------
     SHOW DASHBOARD
     ------------------------------------------------------- */

  showScreen(dashboardScreen);

}


/* =========================================================
   WELCOME → LOGIN
   ========================================================= */

if (signInBtn) {

  signInBtn.addEventListener(
    "click",
    () => {

      if (loginMessage) {
        loginMessage.textContent = "";
      }

      showScreen(loginScreen);

    }
  );

}


/* =========================================================
   WELCOME → CREATE ACCOUNT
   ========================================================= */

if (createAccountBtn) {

  createAccountBtn.addEventListener(
    "click",
    () => {

      if (signupMessage) {
        signupMessage.textContent = "";
      }

      showScreen(signupScreen);

    }
  );

}


/* =========================================================
   BACK FROM LOGIN
   ========================================================= */

if (backFromLogin) {

  backFromLogin.addEventListener(
    "click",
    () => {

      if (loginMessage) {
        loginMessage.textContent = "";
      }

      if (loginForm) {
        loginForm.reset();
      }

      showScreen(welcomeScreen);

    }
  );

}


/* =========================================================
   BACK FROM SIGNUP
   ========================================================= */

if (backFromSignup) {

  backFromSignup.addEventListener(
    "click",
    () => {

      if (signupMessage) {
        signupMessage.textContent = "";
      }

      if (signupForm) {
        signupForm.reset();
      }

      showScreen(welcomeScreen);

    }
  );

}


/* =========================================================
   CREATE ACCOUNT
   ========================================================= */

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      if (!auth) {

        signupMessage.textContent =
          "Firebase is not initialized.";

        signupMessage.style.color =
          "#b42318";

        return;
      }


      const name =
        signupName.value.trim();

      const email =
        signupEmail.value.trim();

      const password =
        signupPassword.value;


      if (!name) {

        signupMessage.textContent =
          "Please enter your full name.";

        signupMessage.style.color =
          "#b42318";

        return;
      }


      if (!email) {

        signupMessage.textContent =
          "Please enter your email address.";

        signupMessage.style.color =
          "#b42318";

        return;
      }


      if (password.length < 6) {

        signupMessage.textContent =
          "Your password must contain at least 6 characters.";

        signupMessage.style.color =
          "#b42318";

        return;
      }


      signupMessage.textContent =
        "Creating your account...";

      signupMessage.style.color =
        "#555";


      try {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );


        const user =
          userCredential.user;


        if (name) {

          await updateProfile(
            user,
            {
              displayName: name
            }
          );

        }


        console.log(
          "SPEED-EDGE account created:",
          user.uid
        );


        signupMessage.textContent =
          "Account created successfully!";

        signupMessage.style.color =
          "#166534";


        /*
         Firebase has automatically signed the
         new user in.

         onAuthStateChanged will open dashboard.
        */

      } catch (error) {

        signupMessage.textContent =
          getFriendlyError(error);

        signupMessage.style.color =
          "#b42318";

      }

    }
  );

}


/* =========================================================
   SIGN IN
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      if (!auth) {

        loginMessage.textContent =
          "Firebase is not initialized.";

        loginMessage.style.color =
          "#b42318";

        return;
      }


      const email =
        loginEmail.value.trim();

      const password =
        loginPassword.value;


      if (!email || !password) {

        loginMessage.textContent =
          "Please enter your email and password.";

        loginMessage.style.color =
          "#b42318";

        return;
      }


      loginMessage.textContent =
        "Signing you in...";

      loginMessage.style.color =
        "#555";


      try {

        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );


        const user =
          userCredential.user;


        console.log(
          "SPEED-EDGE user signed in:",
          user.uid
        );


        loginMessage.textContent =
          "Login successful!";

        loginMessage.style.color =
          "#166534";


        /*
         DO NOT manually open dashboard here.

         onAuthStateChanged handles it.
        */

      } catch (error) {

        loginMessage.textContent =
          getFriendlyError(error);

        loginMessage.style.color =
          "#b42318";

      }

    }
  );

}


/* =========================================================
   SIGN OUT
   ========================================================= */

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async () => {

      if (!auth) {
        return;
      }


      try {

        await signOut(auth);

        console.log(
          "SPEED-EDGE user signed out."
        );


        /*
         onAuthStateChanged will show
         the welcome screen.
        */

      } catch (error) {

        console.error(
          "SPEED-EDGE sign out error:",
          error
        );

      }

    }
  );

}


/* =========================================================
   DASHBOARD TAB NAVIGATION
   ========================================================= */

const dashboardTabs =
  document.querySelectorAll(
    ".dashboard-tab"
  );


const dashboardSections =
  document.querySelectorAll(
    ".dashboard-section"
  );


dashboardTabs.forEach(
  (tab) => {

    tab.addEventListener(
      "click",
      () => {

        const targetId =
          tab.dataset.section;


        dashboardTabs.forEach(
          (item) => {

            item.classList.remove(
              "active"
            );

          }
        );


        dashboardSections.forEach(
          (section) => {

            section.classList.remove(
              "active"
            );

          }
        );


        tab.classList.add(
          "active"
        );


        const target =
          document.getElementById(
            targetId
          );


        if (target) {

          target.classList.add(
            "active"
          );

        }


        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }
);


/* =========================================================
   QUICK ACTION BUTTONS
   ========================================================= */

const quickActions =
  document.querySelectorAll(
    ".quick-action"
  );


quickActions.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const targetId =
          button.dataset.sectionTarget;


        const matchingTab =
          document.querySelector(
            `.dashboard-tab[data-section="${targetId}"]`
          );


        if (matchingTab) {

          matchingTab.click();

        }

      }
    );

  }
);


/* =========================================================
   FIREBASE AUTHENTICATION STARTUP
   =========================================================
   
   THIS IS THE IMPORTANT FIX.

   Firebase will explicitly use browserLocalPersistence.
   
   That means:
   
   Login
      ↓
   Firebase saves authentication locally
      ↓
   Close/refresh browser
      ↓
   Firebase restores the user
      ↓
   onAuthStateChanged receives the user
      ↓
   Dashboard opens automatically
   ========================================================= */

async function startAuthentication() {

  if (!auth) {

    console.error(
      "SPEED-EDGE authentication cannot start because Firebase Auth is unavailable."
    );

    showScreen(welcomeScreen);

    return;
  }


  try {

    console.log(
      "Setting SPEED-EDGE Firebase persistence to browserLocalPersistence..."
    );


    await setPersistence(
      auth,
      browserLocalPersistence
    );


    console.log(
      "SPEED-EDGE Firebase persistence enabled successfully."
    );


    onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          console.log(
            "SPEED-EDGE authenticated user restored:",
            user.email
          );


          console.log(
            "SPEED-EDGE UID:",
            user.uid
          );


          openDashboard(user);

        } else {

          console.log(
            "No authenticated SPEED-EDGE user."
          );


          showScreen(
            welcomeScreen
          );

        }

      }
    );


  } catch (error) {

    console.error(
      "SPEED-EDGE Firebase persistence failed:",
      error
    );


    /*
     Even if persistence cannot be enabled,
     allow Firebase authentication to continue.
    */

    onAuthStateChanged(
      auth,
      (user) => {

        if (user) {

          openDashboard(user);

        } else {

          showScreen(
            welcomeScreen
          );

        }

      }
    );

  }

}


/* =========================================================
   START APPLICATION
   ========================================================= */

startAuthentication();


console.log(
  "SPEED-EDGE application loaded successfully."
);
