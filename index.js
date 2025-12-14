const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const convertBtn = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");


const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  SGD: "S$",
  NZD: "NZ$",
};

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;
  if (isNaN(amount)) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }
  resultDiv.textContent = "Converting…";
  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.textContent = `${symbols[from]}${amount} ${from} = ${symbols[to]}${converted} ${to}`;
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Error fetching rates.Please Check your Internet Connection.";
  }
}

convertBtn.addEventListener("click", convertCurrency);


window.addEventListener("load", () => convertCurrency());
