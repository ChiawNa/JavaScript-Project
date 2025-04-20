const buttonsEl = document.querySelectorAll("button");
const answer = document.getElementById("result");

buttonsEl.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (buttonValue === "C") {
      clearResult();
    } else if (buttonValue === "=") {
      calculateResult();
    } else {
      appendValue(buttonValue);
    }
  });
});

function clearResult() {
  answer.value = "";
}

function calculateResult() {
  answer.value = eval(answer.value);
}

function appendValue(buttonValue) {
  answer.value += buttonValue;
}
