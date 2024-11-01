const fetchPayslip = async function () {
  const baseUrl = `https://zahin420.pythonanywhere.com/api/v1/payslip/1`;
  const response = await fetch(baseUrl);
  return await response.json();
};

const payslip = fetchPayslip();
console.log(payslip);
