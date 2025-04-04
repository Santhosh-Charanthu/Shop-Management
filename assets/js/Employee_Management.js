document.addEventListener("DOMContentLoaded", function () {
  // Predefined Employees
  const predefinedEmployees = [
    {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      jobTitle: "Store Manager",
      phoneNumber: "+91 9876543210",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      gender: "Female",
      jobTitle: "Cashier",
      phoneNumber: "+91 8765432109",
    },
    {
      firstName: "Robert",
      lastName: "Brown",
      gender: "Male",
      jobTitle: "Inventory Manager",
      phoneNumber: "+91 8765123490",
    },
  ];

  function loadEmployees() {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let tableBody = document.getElementById("employeeTableBody");

    tableBody.innerHTML = ""; // Clear existing rows

    // Display predefined employees
    predefinedEmployees.forEach((employee, index) => {
      let row = createTableRow(employee, index + 1);
      tableBody.appendChild(row);
    });

    // Display stored employees (limit to 3)
    employees.slice(0, 3).forEach((employee, index) => {
      let row = createTableRow(
        employee,
        predefinedEmployees.length + index + 1
      );
      tableBody.appendChild(row);
    });
  }

  function createTableRow(employee, empNumber) {
    let row = document.createElement("tr");
    row.innerHTML = `
              <td class="user-id">
                  <img src="./icon.jpg" class="user-avatar" alt="User Avatar" />
                  EMP${empNumber.toString().padStart(3, "0")}
              </td>
              <td>${employee.firstName} ${employee.lastName}</td>
              <td>${employee.gender}</td>
              <td>${employee.jobTitle}</td>
              <td>${employee.phoneNumber.replace(
                /^(\+\d{2})(\d{10})$/,
                "$1 $2"
              )}</td>
              <td>
                  <div class="action-buttons">
                      <button class="edit-btn" onclick="editEmployee(${
                        empNumber - 1
                      })">✏️</button>
                      <button class="delete-btn" onclick="deleteEmployee(${
                        empNumber - 1
                      })">🗑️</button>
                  </div>
              </td>
          `;
    return row;
  }

  // Function to delete an employee
  window.deleteEmployee = function (index) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (index >= predefinedEmployees.length) {
      let storedIndex = index - predefinedEmployees.length;
      if (storedIndex < employees.length) {
        employees.splice(storedIndex, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
        loadEmployees();
      }
    } else {
      alert("Cannot delete predefined employees.");
    }
  };

  // Load employees on page load
  loadEmployees();
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggler = document.getElementById("sidebarToggler");
  const closeSidebar = document.getElementById("closeSidebar");

  // Show sidebar when toggler is clicked
  sidebarToggler.addEventListener("click", function () {
    sidebar.classList.add("show");
  });

  // Hide sidebar when close button (X) is clicked
  closeSidebar.addEventListener("click", function () {
    sidebar.classList.remove("show");
  });
});
