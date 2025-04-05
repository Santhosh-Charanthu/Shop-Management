document.addEventListener("DOMContentLoaded", function () {
  // Predefined Shops
  const predefinedShops = [
    {
      firstName: "David",
      lastName: "Wise",
      email: "elegant@example.com",
      garmentsType: "Women Garments",
      phoneNumber: "+91 9876543210",
    },
    {
      firstName: "Lena",
      lastName: "Stone",
      email: "urban@outfit.com",
      garmentsType: "Men Garments",
      phoneNumber: "+91 8765432109",
    },
    {
      firstName: "Marcus",
      lastName: "Brooks",
      email: "stylemix@example.com",
      garmentsType: "Both",
      phoneNumber: "+91 7654321098",
    },
  ];

  function loadShops() {
    let shops = JSON.parse(localStorage.getItem("shops")) || [];
    let tableBody = document.getElementById("shopTableBody");

    tableBody.innerHTML = ""; // Clear existing rows

    // Display predefined shops
    predefinedShops.forEach((shop, index) => {
      let row = createTableRow(shop, index + 1);
      tableBody.appendChild(row);
    });

    // Display stored shops (limit to 3)
    shops.slice(0, 3).forEach((shop, index) => {
      let row = createTableRow(shop, predefinedShops.length + index + 1);
      tableBody.appendChild(row);
    });
  }

  function createTableRow(shop, shopNumber) {
    let row = document.createElement("tr");
    row.innerHTML = `
              <td class="user-id">
                  <i class="fas fa-user-tie" style="margin-right:20px"></i>
                  USR${shopNumber.toString().padStart(3, "0")}
              </td>
              <td>${shop.firstName} ${shop.lastName}</td>
              <td>${shop.email}</td>
              <td>${shop.garmentsType}</td>
              <td>${shop.phoneNumber.replace(
                /^(\+\d{2})(\d{10})$/,
                "$1 $2"
              )}</td>
              <td>
                  <div class="action-buttons">
                      <button class="edit-btn" onclick="editShop(${
                        shopNumber - 1
                      })">✏️</button>
                      <button class="delete-btn" onclick="deleteShop(${
                        shopNumber - 1
                      })">🗑️</button>
                  </div>
              </td>
          `;
    return row;
  }

  // Function to delete a shop
  window.deleteShop = function (index) {
    let shops = JSON.parse(localStorage.getItem("shops")) || [];

    if (index >= predefinedShops.length) {
      let storedIndex = index - predefinedShops.length;
      if (storedIndex < shops.length) {
        shops.splice(storedIndex, 1);
        localStorage.setItem("shops", JSON.stringify(shops));
        loadShops();
      }
    } else {
      alert("Cannot delete predefined shops.");
    }
  };

  // Load shops on page load
  loadShops();
});

// Sidebar toggle functionality
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

document.addEventListener("DOMContentLoaded", function () {
  const isNetlify = window.location.hostname.includes("netlify.app");

  if (isNetlify) {
    document.getElementById("css-link").href =
      "/pages/shop-registration/styles.css";
    document.getElementById("js-script").src =
      "/pages/shop-registration/script.js";
  }
});
