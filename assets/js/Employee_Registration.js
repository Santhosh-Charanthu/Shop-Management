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

let otpVerified = false;

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
      otpVerified = true;
      document.getElementById("phoneOtp").disabled = true;
      document.getElementById("sendOtpBtn").disabled = true;
      document.getElementById("phoneNumber").disabled = true;
      let verifyBtn = document.getElementById("verifyOtpBtn");
      verifyBtn.style.backgroundColor = "#28a745";
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

(function () {
  "use strict";
  let form = document.querySelector(".needs-validation");

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });

  // Hide error message when user types in a field
  let inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".needs-validation")
    .addEventListener("submit", function (event) {
      if (!this.checkValidity()) {
        event.preventDefault();
        console.log("Form is invalid.");
      } else {
        event.preventDefault();
        if (otpVerified) {
          saveFormData();
          alert("Employee data stored!");

          setTimeout(function () {
            window.location.href = "Employee_Management.html";
          }, 500);
        } else {
          alert("Verify your mobile number");
        }
      }
      this.classList.add("was-validated");
    });
});

function saveFormData() {
  let formData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    jobTitle: document.getElementById("jobTitle").value,
    joiningDate: document.getElementById("joiningDate").value,
    salary: document.getElementById("salary").value.trim(),
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    altPhone: document.getElementById("altPhone").value.trim(),
    password: document.getElementById("password").value,
  };

  // Get existing data or create empty array
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  // Add new employee to the array
  employees.push(formData);

  // Store updated array in localStorage
  localStorage.setItem("employees", JSON.stringify(employees));
}
