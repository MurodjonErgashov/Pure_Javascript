//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResult, 2000);
  e.preventDefault();
});

// Calculate result
function calculateResult() {
  // Ui vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute mounthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
  } else {
    showError("Please check your numbers");
  }
  document.getElementById("loading").style.display = "none";

  // e.preventDefault();
}

// showError
function showError(error) {
  //get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // create div
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  // create textnode and append
  errorDiv.appendChild(document.createTextNode(error));

  // insertt error above heading
  card.insertBefore(errorDiv, heading);

  // Clear after 3s
  setTimeout(clearError, 3000);
}

// ClearError
function clearError() {
  document.querySelector(".alert").remove();
}
