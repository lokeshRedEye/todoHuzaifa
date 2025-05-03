// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1Y6r6oC-M5XKC0cwbrNAAStRa3jrssyU",
  authDomain: "login-ca987.firebaseapp.com",
  projectId: "login-ca987",
  storageBucket: "login-ca987.appspot.com", // fixed typo here
  messagingSenderId: "861756286224",
  appId: "1:861756286224:web:1c1ef9b5a9f241841a7195",
  measurementId: "G-5G4PTG5EGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
  const submit = document.getElementById('submit');

  submit.addEventListener('click', function(event) {
    event.preventDefault();

    // ✅ Get values INSIDE the click function
    const email = document.getElementById('emailid').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Account created successfully!");
        // Redirect if needed: window.location.href = "/dashboard.html";
        window.location.href = "/index"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  });
});
