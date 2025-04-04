# 🏪 Shop Management System

A dynamic, multi-page web application for managing shops and employees. This system enables registration, OTP verification, and persistent storage using the browser's `localStorage`. It also includes dashboards for shop users and employees, making it easy to manage and view registered data.

---

## 📌 Features

### 🧑‍💼 User (Shop) Management Dashboard
- Displays a table of shop users.
- Predefined static user entries cannot be deleted.
- New shop users can be added via the "Add User" button.
- By clicking on "Add User" button it redirects to a **Shop Registration** form.

### 📝 Shop Registration Form
- Collects full shop/user details including:
  - Shop related details
  - Email (with OTP verification)
  - Mobile Number (with OTP verification)
- After successful OTP verification:
  - Phone input and OTP-related buttons are disabled.
- On submitting the form:
  - Data is stored in the browser's `localStorage`.
  - User is redirected to employee dashboard.
  - New shop will be added in a new row of the table.

### 👩‍💼 Employee Dashboard
- Displays all registered employee details in a table.
- "Add Employee" button redirects to the employee registration form.

### 👨‍🔧 Employee Registration
- Similar to shop registration:
  - Collects personal details + phone number with OTP verification.
- After successful OTP verification:
  - Fields and OTP buttons are disabled.
- On form submission:
  - Saves data to `localStorage`.
  - Redirects back to the Employee Dashboard.
  - Recently registered employees appear as new entries.

### 🗑️ Deletion Feature
- Users and employees added through the registration forms can be deleted.
- Predefined/static entries are protected from deletion.

---

## 🧰 Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap**
- **JavaScript**

---

## OTP Verifications

- **Firebase** for mobile OTP verification.
- **Email.js** for email OTP verification

---

## 💾 Data Persistence

- All form data is saved locally using the browser's `localStorage`.
- Allows for dynamic updating of dashboards without a backend.
- OTP verification flow is mocked/simulated for demo purposes.

---

## 🚀 How to Run

1. Clone or download the repository.
2. Navigate to the `pages/shop-dashboard/` folder.
3. Open `index.html` in your browser to launch the application.
4. Navigate through dashboards and forms using buttons and links.

---

## 🚀 Live Demo

You can check out the live version of this project here:  
👉 [Shop Management](https://shopmanagement.netlify.app/pages/shop-dashboard/index.html)

📍 **Note:** The main entry point of this application is the **Shop Dashboard**, located at:  
`/pages/shop-dashboard/index.html`

This is the **default landing page** for the deployed project.
