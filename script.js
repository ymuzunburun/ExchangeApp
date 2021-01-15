const data = {
  USD: { EUR: 0.82, GBP: 0.74, TRY: 7.65 },
  EUR: { USD: 1.23, GBP: 0.91, TRY: 9.36 },
  GBP: { USD: 1.35, EUR: 1.1, TRY: 10.3 },
  TRY: { USD: 0.13, EUR: 0.11, GBP: 0.097 },
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
console.log(parentEl.value);

const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {
  // kimden ceviriyourz

  let fromTarget = document.querySelector(
    "input[name='currency_from']:checked"
  );
  if (fromTarget) {
    fromTarget = fromTarget.value;
  } else {
    myFunction("Please select for 'From'");
    return;
  }
  // kime ceviriyoruz
  let toTarget = document.querySelector("input[name='currency_to']:checked");
  if (toTarget) {
    toTarget = toTarget.value;
  } else {
    myFunction("Please select for 'To'");
    return;
  }

  if (fromTarget === toTarget) {
    myFunction("'To' and 'From' cannot be the same");
    return;
  }
  // amountu alalim
  const amount = document.querySelector("input[name='amount']").value;
  if (isNaN(amount)) {
    myFunction("The value you enter must be a number. ");
    return;
  }

  const currentCurrencyObject = data[fromTarget];
  const resultForOne = currentCurrencyObject[toTarget];
  const result = (amount * resultForOne).toFixed(2);

  const currencyResult = document.querySelector("#currency-result");
  currencyResult.innerHTML =
    amount +
    " " +
    symbolFunction(fromTarget) +
    " = " +
    result +
    " " +
    symbolFunction(toTarget);
});

function myFunction(message) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
  document.querySelector("#snackbar").innerHTML = message;
}

function symbolFunction(element) {
  console.log(element);
  switch (element) {
    case "USD":
      return "$";
      break;
    case "EUR":
      return "€";
      break;
    case "GBP":
      return "£";
      break;
    case "TRY":
      return "₺";
      break;
  }
}
