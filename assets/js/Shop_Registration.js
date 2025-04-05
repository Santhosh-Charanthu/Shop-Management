(function () {
  "use strict";
  let forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp8E7jQc6bPcEtCYulQ0VA4PvLRT9vEng",
  authDomain: "assignment-6f71e.firebaseapp.com",
  projectId: "assignment-6f71e",
  storageBucket: "assignment-6f71e.appspot.com",
  messagingSenderId: "1002884456111",
  appId: "1:1002884456111:web:88be39c5ca6d083e3b7e5a",
  measurementId: "G-CQ1RMEVM0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

let recaptchaVerifier;
let canRequestOtp = true;

function initializeRecaptcha() {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA verified successfully!"),
      "expired-callback": () => {
        showMessage("reCAPTCHA expired. Please try again.", "error");
        resetRecaptcha();
      },
    });

    recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  }
}

function resetRecaptcha() {
  if (window.recaptchaWidgetId !== undefined) {
    grecaptcha.reset(window.recaptchaWidgetId);
  }
}

function sendOtpMobile() {
  if (!canRequestOtp) {
    showMessage("Please wait before requesting another OTP.", "error");
    return;
  }

  let phoneNumber = document.getElementById("phoneNumber").value.trim();
  setButtonState("sendOtpBtn", true);

  if (!phoneNumber.startsWith("+")) {
    showMessage(
      "Enter phone number with country code (e.g., +91xxxxxxxxxx)",
      "error"
    );
    setButtonState("sendOtpBtn", false);
    return;
  }

  initializeRecaptcha();
  resetRecaptcha();

  auth.signOut().then(() => {
    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        showMessage("OTP sent to " + phoneNumber, "success");

        canRequestOtp = false;
        setTimeout(() => {
          canRequestOtp = true;
        }, 30000);
      })
      .catch((error) => {
        showMessage(getFirebaseErrorMessage(error.code), "error");
        resetRecaptcha();
      })
      .finally(() => setButtonState("sendOtpBtn", false));
  });
}

let mobileOtpVerified = false;

function verifyOtp() {
  const otp = document.getElementById("phoneOtp").value.trim();
  setButtonState("verifyOtpBtn", true);

  if (!otp) {
    showMessageForOtp("Please enter OTP", "error");
    setButtonState("verifyOtpBtn", false);
    return;
  }

  window.confirmationResult
    .confirm(otp)
    .then((result) => {
      showMessageForOtp("Phone number verified successfully!", "success");
      mobileOtpVerified = true;
      document.getElementById("phoneNumber").disabled = true;
      document.getElementById("phoneOtp").disabled = true;
      document.getElementById("sendOtpBtn").disabled = true;
      let verifyBtn = document.getElementById("verifyOtpBtn");
      verifyBtn.style.color = "white";
      verifyBtn.innerText = "OTP Verified";
      verifyBtn.disabled = true;
    })
    .catch(() => {
      showMessageForOtp("Invalid OTP, please try again.", "error");
      setButtonState("verifyOtpBtn", false);
    });
}

function setButtonState(buttonId, disabled) {
  document.getElementById(buttonId).disabled = disabled;
}

function showMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = message;
  messageDiv.className = `message ${
    type === "success" ? "success-message" : "error-message"
  }`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

function showMessageForOtp(message, type) {
  const messageDiv = document.getElementById("otp-message");
  messageDiv.innerText = message;
  messageDiv.className = `message ${
    type === "success" ? "success-message" : "error-message"
  }`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

function getFirebaseErrorMessage(errorCode) {
  const errorMessages = {
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/captcha-check-failed": "reCAPTCHA verification failed. Retry.",
    "auth/invalid-phone-number": "Invalid phone number. Use correct format.",
    "auth/quota-exceeded": "SMS quota exceeded. Try again later.",
    "auth/internal-error": "An internal error occurred. Please retry.",
  };
  return errorMessages[errorCode] || "An unknown error occurred.";
}

window.sendOtpMobile = sendOtpMobile;
window.verifyOtp = verifyOtp;

// Initialize EmailJS with your public key
emailjs.init("6r2Jkg5Lr8P-2pquF");

let generatedOtp = "";

// Function to generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP via EmailJS
function sendOtpEmail() {
  const email = document.getElementById("email").value.trim();

  if (!validateEmail(email)) {
    showMessageForEmail("Please enter a valid email address.", "error");
    return;
  }

  generatedOtp = generateOtp(); // Generate OTP

  const templateParams = {
    to_email: email, // Ensure this matches the placeholder in your EmailJS template
    otp: generatedOtp,
  };

  emailjs
    .send("service_syg6yit", "template_wqg5kvr", templateParams)
    .then(function (response) {
      showMessageForEmail("OTP sent successfully to " + email, "success");
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch(function (error) {
      showMessageForEmail("Error sending OTP. Please try again.", "error");
      console.error("FAILED...", error);
    });
}

let emailOtpVerified = false;

// Function to verify OTP entered by the user
function verifyEmailOtp() {
  const enteredOtp = document.getElementById("emailOtp").value.trim();

  if (!enteredOtp) {
    showMessageForEmailOtp("Please enter the OTP.", "error");
    return;
  }

  if (enteredOtp === generatedOtp) {
    showMessageForEmailOtp("OTP verified successfully!", "success");
    emailOtpVerified = true;
    document.getElementById("emailOtp").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("sendEmailOtpBtn").disabled = true;
    let verifyBtn = document.getElementById("verify-btn");
    verifyBtn.style.color = "white";
    verifyBtn.innerText = "OTP Verified";
    verifyBtn.disabled = true;
  } else {
    showMessageForEmailOtp("Invalid OTP. Please try again.", "error");
  }
}

function showMessageForEmail(message, type) {
  const messageDiv = document.getElementById("email-message");
  messageDiv.innerText = message;
  messageDiv.className = `message ${
    type === "success" ? "success-message" : "error-message"
  }`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

// Function to show OTP-specific messages
function showMessageForEmailOtp(message, type) {
  const messageDiv = document.getElementById("email-otp-message");
  messageDiv.innerText = message;
  messageDiv.className = `message ${
    type === "success" ? "success-message" : "error-message"
  }`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

// Basic Email Validation
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

// Ensure global access
window.sendOtpEmail = sendOtpEmail;
window.verifyEmailOtp = verifyEmailOtp;

document
  .getElementById("confirmPassword")
  .addEventListener("input", function () {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword) {
      console.log("Matched");
      this.setCustomValidity(""); // Clears any validation errors
    } else {
      console.log("Mismatched");
      this.setCustomValidity("Passwords do not match!"); // Shows error
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
    } else {
      event.preventDefault(); // Stop default form submission

      if (mobileOtpVerified && emailOtpVerified) {
        saveShopData(); // Save shop data
        alert("Shop data stored!");

        // Delay navigation to ensure everything is processed
        setTimeout(() => {
          window.location.href = "Employee_Management.html";
        }, 500);
      } else {
        alert("Verify both mobile and email");
      }
    }
  });
});

function saveShopData() {
  let shopData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    shopName: document.getElementById("shopName").value.trim(),
    shopAddress: document.getElementById("shopAddress").value.trim(),
    garmentsType: document.getElementById("garmentsType").value,
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
  };

  // Get existing shop data or create an empty array
  let shops = JSON.parse(localStorage.getItem("shops")) || [];

  // Add new shop to the array
  shops.push(shopData);

  // Store updated array in localStorage
  localStorage.setItem("shops", JSON.stringify(shops));
}
