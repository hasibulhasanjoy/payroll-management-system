const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get("id");

const fetchPayslip = async function () {
  const baseUrl = `https://zahin420.pythonanywhere.com/api/v1/payslip/${employeeId}`;
  const response = await fetch(baseUrl);
  return await response.json();
};

const getPayslip = async function () {
  const payslip = await fetchPayslip();
  console.log(payslip[0]);
  const {
    date,
    details: { name, department, compensations, deductions, main_payscale },
  } = payslip[0];
  renderPayslipData(
    date,
    name,
    department,
    compensations,
    deductions,
    main_payscale
  );
};

const renderPayslipData = function (
  date,
  name,
  department,
  compensations,
  deductions,
  main_payscale
) {
  document.getElementById("employee-name").innerHTML = `Name: ${name}`;
  document.getElementById(
    "employee-department"
  ).innerHTML = `Department: ${department}`;
  document.getElementById("date").innerHTML = `Date: ${date}`;
};

getPayslip();
