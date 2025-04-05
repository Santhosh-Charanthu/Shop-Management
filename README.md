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
  - User is redirected back to the dashboard.
  - New shop appears in a new row of the table.

### 👩‍💼 Employee Dashboard
- Displays all registered employee details in a table.
- "Add Employee" button redirects to the employee registration form.
- Recently registered employees appear as new entries.

### 👨‍🔧 Employee Registration
- Similar to shop registration:
  - Collects personal details + phone number with OTP verification.
- After successful OTP verification:
  - Fields and OTP buttons are disabled.
- On form submission:
  - Saves data to `localStorage`.
  - Redirects back to the Employee Dashboard.
  - Shows newly added employee.

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

## 💾 Data Persistence

- All form data is saved locally using the browser's `localStorage`.
- Allows for dynamic updating of dashboards without a backend.
- OTP verification flow is mocked/simulated for demo purposes.

---

## 🚀 How to Run

1. Clone or download the project folder.
2. Open `User_Management.html` in your browser to get started.
3. Navigate through dashboards and forms using buttons and links.

---

## 🚀 Live Demo

You can check out the live version of this project here:  
👉 [Shop Management](https://shopmanagement.netlify.app/pages/shop-dashboard/index.html)

