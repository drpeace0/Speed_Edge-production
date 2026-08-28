// ============================================================
// SPEED-EDGE LOGISTICS
// COMPLETE FIREBASE AUTH + DASHBOARD APP.JS
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

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
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ============================================================
// GET EXISTING HTML ELEMENTS
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
// HELPER: HIDE ALL AUTH SCREENS
// ============================================================

function hideAuthScreens() {

  if (welcomeScreen) {
    welcomeScreen.classList.add("hidden");
    welcomeScreen.style.display = "none";
  }

  if (loginScreen) {
    loginScreen.classList.add("hidden");
    loginScreen.style.display = "none";
  }

  if (signupScreen) {
    signupScreen.classList.add("hidden");
    signupScreen.style.display = "none";
  }
}


// ============================================================
// SHOW A PARTICULAR AUTH SCREEN
// ============================================================

function showScreen(screen) {

  hideAuthScreens();

  if (screen) {
    screen.classList.remove("hidden");
    screen.style.display = "";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ============================================================
// FIREBASE ERROR HANDLER
// ============================================================

function getFriendlyError(error) {

  console.error("========== SPEED-EDGE FIREBASE ERROR ==========");
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);
  console.error("Full error:", error);
  console.error("==============================================");

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

    default:
      return "Firebase error: " + (error.code || "unknown error");
  }
}


// ============================================================
// WELCOME SCREEN → LOGIN
// ============================================================

if (signInBtn) {

  signInBtn.addEventListener("click", () => {

    if (loginMessage) {
      loginMessage.textContent = "";
    }

    if (loginForm) {
      loginForm.reset();
    }

    showScreen(loginScreen);

  });

}


// ============================================================
// WELCOME SCREEN → CREATE ACCOUNT
// ============================================================

if (createAccountBtn) {

  createAccountBtn.addEventListener("click", () => {

    if (signupMessage) {
      signupMessage.textContent = "";
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
    }

    showScreen(welcomeScreen);

  });

}


// ============================================================
// CREATE ACCOUNT
// ============================================================

if (signupForm) {

  signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (signupMessage) {
      signupMessage.textContent = "Creating your account...";
      signupMessage.style.color = "";
    }

    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    if (!name) {

      signupMessage.textContent =
        "Please enter your full name.";

      signupMessage.style.color = "#b42318";

      return;
    }

    if (!email) {

      signupMessage.textContent =
        "Please enter your email address.";

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


      if (signupMessage) {

        signupMessage.textContent =
          "Account created successfully!";

        signupMessage.style.color = "#166534";

      }


      // Firebase will automatically trigger
      // onAuthStateChanged() below.
      // We DO NOT send the user back to the welcome screen.

    }

    catch (error) {

      signupMessage.textContent =
        getFriendlyError(error);

      signupMessage.style.color = "#b42318";

    }

  });

}


// ============================================================
// LOGIN
// ============================================================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (loginMessage) {

      loginMessage.textContent =
        "Signing you in...";

      loginMessage.style.color = "";

    }


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
        "SPEED-EDGE login successful:",
        userCredential.user.uid
      );


      if (loginMessage) {

        loginMessage.textContent =
          "Login successful! Loading your dashboard...";

        loginMessage.style.color = "#166534";

      }


      // IMPORTANT:
      // DO NOT show welcomeScreen here.
      //
      // Firebase will trigger onAuthStateChanged()
      // and that function will open the dashboard.

    }

    catch (error) {

      console.error(error);

      loginMessage.textContent =
        getFriendlyError(error);

      loginMessage.style.color = "#b42318";

    }

  });

}


// ============================================================
// CREATE DASHBOARD
// ============================================================

function createDashboard(user) {

  let dashboard = document.getElementById("speedEdgeDashboard");


  // If dashboard already exists, don't create another one.
  if (dashboard) {

    dashboard.style.display = "block";

    return dashboard;

  }


  dashboard = document.createElement("div");

  dashboard.id = "speedEdgeDashboard";

  dashboard.innerHTML = `

    <div style="
      min-height:100vh;
      background:#f7f7f7;
      font-family:Arial, sans-serif;
    ">

      <!-- HEADER -->

      <header style="
        background:#111;
        color:white;
        padding:18px 20px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        position:sticky;
        top:0;
        z-index:10;
      ">

        <div style="
          font-size:24px;
          font-weight:800;
        ">
          SPEED<span style="color:#f5c400;">-EDGE</span>
        </div>


        <button
          id="speedEdgeLogout"
          style="
            border:0;
            background:#f5c400;
            color:#111;
            padding:10px 16px;
            border-radius:8px;
            font-weight:700;
            cursor:pointer;
          "
        >
          Sign Out
        </button>

      </header>


      <!-- CONTENT -->

      <main style="
        max-width:1100px;
        margin:auto;
        padding:25px 18px 50px;
      ">


        <!-- WELCOME -->

        <section style="
          background:white;
          border-radius:16px;
          padding:25px;
          margin-bottom:22px;
          box-shadow:0 2px 10px rgba(0,0,0,.06);
        ">

          <h1 style="
            margin:0 0 8px;
            font-size:28px;
          ">
            Welcome to SPEED-EDGE 👋
          </h1>

          <p style="
            margin:0;
            color:#666;
            font-size:16px;
          ">
            Manage your deliveries quickly and easily.
          </p>

          <p style="
            margin-top:12px;
            color:#444;
          ">
            Signed in as:
            <strong id="dashboardUserEmail"></strong>
          </p>

        </section>


        <!-- STAT CARDS -->

        <section style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
          gap:15px;
          margin-bottom:25px;
        ">


          <div style="
            background:white;
            border-radius:14px;
            padding:22px;
            box-shadow:0 2px 8px rgba(0,0,0,.05);
          ">

            <div style="
              color:#777;
              font-size:14px;
            ">
              Total Deliveries
            </div>

            <strong style="
              display:block;
              font-size:30px;
              margin-top:8px;
            ">
              0
            </strong>

          </div>


          <div style="
            background:white;
            border-radius:14px;
            padding:22px;
            box-shadow:0 2px 8px rgba(0,0,0,.05);
          ">

            <div style="
              color:#777;
              font-size:14px;
            ">
              Active Deliveries
            </div>

            <strong style="
              display:block;
              font-size:30px;
              margin-top:8px;
            ">
              0
            </strong>

          </div>


          <div style="
            background:white;
            border-radius:14px;
            padding:22px;
            box-shadow:0 2px 8px rgba(0,0,0,.05);
          ">

            <div style="
              color:#777;
              font-size:14px;
            ">
              Completed
            </div>

            <strong style="
              display:block;
              font-size:30px;
              margin-top:8px;
            ">
              0
            </strong>

          </div>


          <div style="
            background:white;
            border-radius:14px;
            padding:22px;
            box-shadow:0 2px 8px rgba(0,0,0,.05);
          ">

            <div style="
              color:#777;
              font-size:14px;
            ">
              Revenue
            </div>

            <strong style="
              display:block;
              font-size:30px;
              margin-top:8px;
            ">
              ₦0
            </strong>

          </div>

        </section>


        <!-- QUICK ACTIONS -->

        <section style="
          background:white;
          border-radius:16px;
          padding:25px;
          box-shadow:0 2px 10px rgba(0,0,0,.06);
        ">

          <h2 style="
            margin-top:0;
          ">
            Quick Actions
          </h2>


          <div style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
            gap:15px;
          ">


            <button
              id="newDeliveryButton"
              style="
                background:#f5c400;
                border:0;
                padding:16px;
                border-radius:10px;
                font-size:16px;
                font-weight:700;
                cursor:pointer;
              "
            >
              🚚 New Delivery
            </button>


            <button
              id="trackDeliveryButton"
              style="
                background:#111;
                color:white;
                border:0;
                padding:16px;
                border-radius:10px;
                font-size:16px;
                font-weight:700;
                cursor:pointer;
              "
            >
              📦 Track Delivery
            </button>


            <button
              id="profileButton"
              style="
                background:#eee;
                color:#111;
                border:0;
                padding:16px;
                border-radius:10px;
                font-size:16px;
                font-weight:700;
                cursor:pointer;
              "
            >
              👤 My Profile
            </button>

          </div>


          <div
            id="dashboardNotice"
            style="
              margin-top:20px;
              padding:15px;
              border-radius:10px;
              background:#f8f8f8;
              color:#555;
              display:none;
            "
          ></div>

        </section>


      </main>

    </div>
  `;


  document.body.appendChild(dashboard);


  // ==========================================================
  // SHOW USER EMAIL
  // ==========================================================

  const dashboardUserEmail =
    document.getElementById("dashboardUserEmail");

  if (dashboardUserEmail) {

    dashboardUserEmail.textContent =
      user.email || "";

  }


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logoutButton =
    document.getElementById("speedEdgeLogout");

  if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

      try {

        await signOut(auth);

      }

      catch (error) {

        console.error(
          "Logout error:",
          error
        );

      }

    });

  }


  // ==========================================================
  // QUICK ACTIONS
  // ==========================================================

  const notice =
    document.getElementById("dashboardNotice");


  const showNotice = (message) => {

    if (!notice) return;

    notice.textContent = message;

    notice.style.display = "block";

  };


  const newDeliveryButton =
    document.getElementById("newDeliveryButton");

  if (newDeliveryButton) {

    newDeliveryButton.addEventListener("click", () => {

      showNotice(
        "New Delivery module is ready to be connected."
      );

    });

  }


  const trackDeliveryButton =
    document.getElementById("trackDeliveryButton");

  if (trackDeliveryButton) {

    trackDeliveryButton.addEventListener("click", () => {

      showNotice(
        "Delivery tracking module is ready to be connected."
      );

    });

  }


  const profileButton =
    document.getElementById("profileButton");

  if (profileButton) {

    profileButton.addEventListener("click", () => {

      showNotice(
        "Profile module is ready to be connected."
      );

    });

  }


  return dashboard;

}


// ============================================================
// SHOW DASHBOARD
// ============================================================

function showDashboard(user) {

  hideAuthScreens();


  const dashboard =
    createDashboard(user);


  dashboard.style.display = "block";


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  console.log(
    "SPEED-EDGE dashboard opened for:",
    user.email
  );

}


// ============================================================
// HIDE DASHBOARD
// ============================================================

function hideDashboard() {

  const dashboard =
    document.getElementById("speedEdgeDashboard");


  if (dashboard) {

    dashboard.style.display = "none";

  }

}


// ============================================================
// FIREBASE AUTHENTICATION STATE
// ============================================================
//
// THIS IS THE IMPORTANT PART.
//
// Firebase remembers the logged-in user.
// Therefore, if the page is refreshed,
// the dashboard will be shown again.
//
// ============================================================

onAuthStateChanged(auth, (user) => {

  console.log(
    "Firebase authentication state:",
    user ? user.email : "Not signed in"
  );


  if (user) {

    // USER IS LOGGED IN
    // SHOW DASHBOARD

    showDashboard(user);

  }

  else {

    // USER IS NOT LOGGED IN
    // HIDE DASHBOARD AND SHOW WELCOME

    hideDashboard();

    showScreen(welcomeScreen);

  }

});
