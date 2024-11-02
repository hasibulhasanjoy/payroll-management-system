const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get("id");

const fetchPayslip = async function () {
  const baseUrl = `https://zahin420.pythonanywhere.com/api/v1/payslip/${employeeId}`;
  const response = await fetch(baseUrl);
  return await response.json();
};

const getPayslip = async function () {
  const payslip = await fetchPayslip();
  console.log(payslip[payslip.length - 1]);
  const {
    date,
    details: { name, department, compensations, deductions, main_payscale },
  } = payslip[0];
  renderEmployeeInformation(date, name, department, main_payscale);
  renderCompensationsData(compensations);
  renderDeductionsData(deductions);
};

const renderCompensationsData = function (compensations) {
  const houseRent = compensations["Home Allowence"] || 0;
  const medicalAllowance = compensations["Medical Allowance"] || 0;
  const festival =
    compensations["eidBonus"] ||
    compensations["durgaPuja"] ||
    compensations["christmas"] ||
    0;
  const newYearBonus = compensations["newYear"] || 0;
  const educationalPromotion = compensations["educationalPromotion"] || 0;
  const specialBenefit = compensations["special benefit"] || 0;
  const totalCompensations =
    houseRent +
    medicalAllowance +
    festival +
    newYearBonus +
    specialBenefit +
    educationalPromotion;
  const compensationsContainer = document.getElementById("compensation-body");
  compensationsContainer.innerHTML = "";
  const html = `
          <tr class="compensation-row">
          </tr>
          <tr class="compensation-row">
            <td>House Rent</td>
            <td>${houseRent}</td>
          </tr>
          <tr class="compensation-row">
            <td>Medical</td>
            <td>${medicalAllowance}</td>
          </tr>
          <tr class="compensation-row">
            <td>Festival Allowance</td>
            <td>${festival}</td>
          </tr>
          <tr class="compensation-row">
            <td>Educational Promotion</td>
            <td>${festival}</td>
          </tr>
          <tr class="compensation-row">
            <td>New Year Bonus</td>
            <td>${newYearBonus}</td>
          </tr>
          <tr class="compensation-row">
            <td>Special Benefit</td>
            <td>${specialBenefit}</td>
          </tr>
          <tr class="total-row">
            <td>Total Compensation</td>
            <td>${totalCompensations}</td>
          </tr>`;
  compensationsContainer.insertAdjacentHTML("afterbegin", html);
};

const renderDeductionsData = function (deductions) {
  const tax = deductions["tax"] || 0;
  const healthInsurance = deductions["healthInsurance"] || 0;
  const providentFund = deductions["provident fund"] || 0;
  const loan = deductions["loan"] || 0;
  const totalDeductions = tax + healthInsurance + providentFund + loan;

  const deductionsContainer = document.getElementById("deduction-body");
  deductionsContainer.innerHTML = "";
  const html = `
          <tr class="deduction-row">
            <td>Tax</td>
            <td>${tax}</td>
          </tr>
          <tr class="deduction-row">
            <td>Health Insurance</td>
            <td>${healthInsurance}</td>
          </tr>
          <tr class="deduction-row">
            <td>Provident Fund</td>
            <td>${providentFund}</td>
          </tr>
          <tr class="deduction-row">
            <td>Loan Repayment</td>
            <td>${loan}</td>
          </tr>
          <tr class="total-row">
            <td>Total Deduction</td>
            <td>${totalDeductions}</td>
          </tr>
        `;
  deductionsContainer.insertAdjacentHTML("afterbegin", html);
};

const renderEmployeeInformation = function (
  date,
  name,
  department,
  main_payscale
) {
  const employeeName = document.getElementById("employee-name");
  const employeeDepartment = document.getElementById("employee-department");
  const basicPay = document.getElementById("basic-pay");
  const calculationDate = document.getElementById("date");

  employeeName.innerHTML = `Name: ${name}`;
  employeeDepartment.innerHTML = `Department: ${department}`;
  basicPay.innerHTML = `Basic Pay: ${main_payscale}`;
  calculationDate.innerHTML = `Date: ${date}`;
};

getPayslip();
