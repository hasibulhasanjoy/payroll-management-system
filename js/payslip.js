// Sample data from the server response
const serverResponse = {
  date: "2024-11-01",
  compensations: {
    HomeAllowance: 5000,
    christmas: 50000,
    eidBonus: 50000,
  },
  deductions: {
    GroupInsurance: 500,
  },
  department: "Computer Science and Engineering",
  main_payscale: 40000,
  name: "Humayun Kabir",
  employee_id: 1,
  id: 13,
};

// Render employee info
document.getElementById("employee-id").innerText += serverResponse.employee_id;
document.getElementById("employee-name").innerText += serverResponse.name;
document.getElementById("employee-designation").innerText += "Lecturer"; // Assuming designation
document.getElementById("employee-department").innerText +=
  serverResponse.department;
document.getElementById("payroll-date").innerText += new Date(
  serverResponse.date
).toLocaleDateString();

// Render compensation and deduction rows
const compensationTable = document.getElementById("compensation-table");
let totalCompensation = 0;

// Adding compensation rows
for (const [key, value] of Object.entries(serverResponse.compensations)) {
  compensationTable.innerHTML += `
      <tr class="compensation-row">
        <td>${key}</td>
        <td>${value}</td>
        <td></td>
        <td></td>
      </tr>`;
  totalCompensation += value;
}

// Adding deduction rows
let totalDeduction = 0;
for (const [key, value] of Object.entries(serverResponse.deductions)) {
  compensationTable.innerHTML += `
      <tr class="compensation-row">
        <td></td>
        <td></td>
        <td>${key}</td>
        <td>${value}</td>
      </tr>`;
  totalDeduction += value;
}

// Display total deduction and total compensation
document.getElementById("total-deduction-amount").innerText = totalDeduction;
document.getElementById("total-compensation-amount").innerText =
  totalCompensation;
