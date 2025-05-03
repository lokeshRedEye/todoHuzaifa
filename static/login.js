// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1Y6r6oC-M5XKC0cwbrNAAStRa3jrssyU",
  authDomain: "login-ca987.firebaseapp.com",
  projectId: "login-ca987",
  storageBucket: "login-ca987.appspot.com",
  messagingSenderId: "861756286224",
  appId: "1:861756286224:web:1c1ef9b5a9f241841a7195",
  measurementId: "G-5G4PTG5EGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.addEventListener('DOMContentLoaded', () => {
  const submit = document.getElementById('submit');
  const googleBtn = document.querySelector(".login-with-google-btn");

  submit.addEventListener('click', function (eventt) {
    eventt.preventDefault();

    const email = document.getElementById('emailid').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login Successful");
        window.location.href = "/index"; // ✅ FLASK-compatible URL
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });

  googleBtn.addEventListener("click", () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Google login successful!");
        window.location.href = "/index";
      })
      .catch((error) => {
        alert("Google login failed: " + error.message);
      });
  });
});
