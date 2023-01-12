const inputEl = document.getElementsByClassName("input-el");
const inputFarm = document.getElementsByClassName("input-farm");
const isPartner = document.getElementById("isPartner");
const isPartnerLabel = document.getElementById("isPartnerLabel");
const optEl = document.getElementsByClassName("opt");
const subContainer = document.getElementsByClassName("sub-container");
const inputs = document.getElementsByTagName("input");
const allResults = document.querySelectorAll(".radius-result > span");
let partnerState = false;

function clearAll() {
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "number") {
      inputs[i].value = "";
    }
  }
  for (i = 0; i < allResults.length; i++) {
    if (allResults[i]) {
      allResults[i].innerText = "0";
    }
  }
}

for (i = 0; i < optEl.length; i++) {
  let elem = optEl[i];
  let elemArg = elem.getAttribute("data-show");
  elem.addEventListener("click", (e) => {
    opt(elemArg);
  });
}
isPartner.addEventListener("change", (e) => {
  if (e.target.checked) {
    isPartnerLabel.innerText = "Com parceria";
  } else {
    isPartnerLabel.innerText = "Sem parceria";
  }
  isPartnerLabel.classList.toggle("isPartner");
  isPartnerLabel.classList.toggle("notPartner");
  partnerState = e.target.checked;
  getTotal();
});
for (i = 0; i < inputEl.length; i++) {
  let input = inputEl[i];
  inputEl[i].addEventListener("input", (e) => {
    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }
    getTotal();
  });
}
inputFarm[0].addEventListener("input", (e) => {
  getFarmTotal();
});
function getTotal() {
  let total = 0;
  for (i = 0; i < inputEl.length; i++) {
    let input = inputEl[i];
    let valor = partnerState
      ? input.getAttribute("data-parceria")
      : input.getAttribute("data-s-parceria");
    total += (input.value / input.getAttribute("data-parcela")) * valor;
    setValue(total);
  }
}

function setValue(total) {
  const brutoEl = document.getElementById("valor-bruto");
  const comissaoEl = document.getElementById("valor-comissao");
  let comissao = total * 0.25;
  const liquidoEl = document.getElementById("valor-liquido");
  let liquido = total - comissao;

  brutoEl.innerText = parseInt(total);
  comissaoEl.innerText = parseInt(comissao);
  liquidoEl.innerText = parseInt(liquido);
}
function getFarmTotal() {
  let total = 0;
  let input = inputFarm[0];
  total += input.value * input.getAttribute("data-farm");
  setFarmValue(total);
}

function setFarmValue(total) {
  const farmPayment = document.getElementById("farm-payment");
  farmPayment.innerText = total;
}
function opt(exp) {
  switch (exp) {
    case "farm":
      clearAll();
      subContainer[0].classList.add("d-none");
      subContainer[1].classList.remove("d-none");

      break;
    case "venda":
      clearAll();
      subContainer[1].classList.add("d-none");
      subContainer[0].classList.remove("d-none");
      break;
  }
}
