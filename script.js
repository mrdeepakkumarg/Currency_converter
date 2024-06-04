let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// const base_url =
//   "https://api.currencyapi.com/v3/latest?apikey=cur_live_epAGemLljiEh29ZWYYdmgSp295UEUbdOHZGIpjDH&";

for (let select of dropdowns) {
  for (currCode in countryList) {
    let optionTags = document.createElement("option");
    optionTags.innerText = currCode;
    optionTags.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      optionTags.selected = "selected";
    } else if (select.name == "to" && currCode == "INR") {
      optionTags.selected = "selected";
    }
    select.append(optionTags);
  }

  select.addEventListener("change", (evt) => {
    updateFlags(evt.target);
  });
}

const updateFlags = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal == " " || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_epAGemLljiEh29ZWYYdmgSp295UEUbdOHZGIpjDH&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;

  console.log(URL);
  let response = await fetch(URL);
  let data = await response.json();
  const result = data.data[toCurr.value].value;
  let newResult = result.toFixed(2);

  let finalValue = amtVal * newResult;

  msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalValue} ${toCurr.value}`;
});
