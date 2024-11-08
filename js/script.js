"use strict";

// API endpoints
const API_BASE_URL = "https://zahin420.pythonanywhere.com/api/v1";
const EMPLOYEES_URL = `${API_BASE_URL}/cse/employees/list/`;
const CALCULATE_URL = `https://zahin420.pythonanywhere.com/api/v1/payslip/list/`;

// Fetch employees from the API
const fetchEmployees = async () => {
  try {
    const response = await fetch(EMPLOYEES_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

const fetchPayslip = async function (id) {
  const url = `https://zahin420.pythonanywhere.com/api/v1/payslip/${id}`;
  const response = await fetch(url);
  return await response.json();
};

// Send calculation request
const sendCalculationRequest = async (data) => {
  const url = `https://zahin420.pythonanywhere.com/api/v1/payslip/list/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending calculation request:", error);
  }
};
// Display employees in the table
const renderEmployeeTable = (employees) => {
  const tableBody = document.querySelector(".container--employee_row");
  tableBody.innerHTML = employees
    .map(({ id, first_name, last_name }) =>
      createEmployeeRow(id, first_name, last_name)
    )
    .join("");

  tableBody.addEventListener("click", (event) => handleEmployeeRowClick(event));
};

// Create HTML for a single employee row
const createEmployeeRow = (id, first_name, last_name) => `
  <tr>
    <td>${first_name} ${last_name}</td>
    <td>CSE</td>
    <td>
      <div class="action-buttons">
        <a href="#" class="btn btn-calculate" data-employee-id="${id}">Calculate</a>
        <a href="#" class="btn btn-payslip" data-employee-id="${id}">Payslip</a>
      </div>
    </td>
  </tr>
`;

// Handle clicks on employee row actions
const handleEmployeeRowClick = (event) => {
  if (event.target.matches(".btn-calculate")) {
    const id = event.target.dataset.employeeId;
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeBtn");
    const holidayForm = document.getElementById("holidayForm");

    modal.style.display = "block";

    closeBtn.onclick = () => (modal.style.display = "none");

    holidayForm.onsubmit = (event) => {
      event.preventDefault();
      const holidaySelections = getHolidaySelections();
      holidayForm.reset();
      modal.style.display = "none";
      handleCalculateClick(id, holidaySelections);
    };
  } else if (event.target.matches(".btn-payslip")) {
    const id = event.target.dataset.employeeId;
    window.location.href = `payslip.html?id=${id}`;
  }
};

// Get holiday selections from the form
const getHolidaySelections = () => {
  const data = {
    isEid: "false",
    isDurgaPuja: "false",
    isChristmas: "false",
    isNewYear: "false",
  };
  const holidayCheckboxes = document.querySelectorAll('input[name="holiday"]');
  holidayCheckboxes.forEach((checkbox) => {
    if (checkbox.value === "Eid" && checkbox.checked) {
      data.isEid = "true";
    }
    if (checkbox.value === "DurgaPuja" && checkbox.checked) {
      data.isDurgaPuja = "true";
    }
    if (checkbox.value === "Christmas" && checkbox.checked) {
      data.isChristmas = "true";
    }
    if (checkbox.value === "New_Year" && checkbox.checked) {
      data.isNewYear = "true";
    }
  });
  return data;
};

// Handle calculation button clicks
const handleCalculateClick = async (id, selections) => {
  const data = { employee_id: +id, ...selections };
  // console.log(data);
  const payslip = await sendCalculationRequest(data);
  // Target the button with a specific data-employee-id attribute
  const calculateButton = document.querySelector(
    `.btn-calculate[data-employee-id="${id}"]`
  );
  calculateButton.textContent = "Calculated";
  calculateButton.classList.add("disabled");

  // console.log(payslip);
};

// Main function to initialize the application
const initializeApp = async () => {
  const employees = await fetchEmployees();
  renderEmployeeTable(employees);
};

// Start the application
initializeApp();
