let equation = "";
let currentNumber = "";
let input = document.getElementById("result");
let brackets = [];
let operation = true; // whether user used operation sign
let lastInput = "";

function Clear() {
  input.value = equation = currentNumber = lastInput = "";
  brackets = [];
}

function Back() {
  if (equation.length == 0) return;

  if (!isNaN(lastInput) || lastInput == ".") {
    // removing last number
    currentNumber = currentNumber.slice(0, -1);
  } else if ((lastInput = ")")) {
    brackets.push("(");
  } else if ((lastInput = "(")) {
    brackets.pop();
  }

  equation = equation.slice(0, -1);
  lastInput = equation.slice(-1);
  input.value = equation;
  SetCaretPosition(input, input.value);
}

function Input(n) {
  if (operation || lastInput == "." || lastInput == "(") return;

  equation += n;
  lastInput = n;
  input.value = equation;
  currentNumber = "";
  SetCaretPosition(input, input.value);

  operation = true;
}

function InputBracketO(n) {
  if (
    (lastInput == "." || !isNaN(lastInput) || lastInput == ")") &&
    equation != ""
  )
    return;

  brackets.push(n);
  currentNumber = "";
  equation += n;
  lastInput = n;
  input.value = equation;
  SetCaretPosition(input, input.value);

  operation = false;
}

function InputBracketC(n) {
  if (brackets.length < 1 || lastInput == "." || operation) return;

  brackets.pop();
  currentNumber = "";
  equation += n;
  lastInput = n;
  input.value = equation;
  SetCaretPosition(input, input.value);

  operation = false;
}

function InputNumber(n) {
  if (currentNumber == "0" || lastInput == ")") return;

  equation += n;
  currentNumber += n;
  lastInput = n;
  input.value = equation;
  SetCaretPosition(input, input.value);

  operation = false;
}

function InputDot(n) {
  if (
    currentNumber.includes(".") ||
    currentNumber.length == 0 ||
    operation ||
    lastInput == "(" ||
    lastInput == ")"
  )
    return;

  currentNumber += n;
  equation += n;
  lastInput = n;
  input.value = equation;
  SetCaretPosition(input, input.value);

  operation = false;
}

function Calculate() {
  if (equation != "") {
    if (brackets.length > 0) {
      alert("To few closing brackets");
      return;
    } else if (isNaN(lastInput) && lastInput != "(" && lastInput != ")") {
      alert("Last input is not valid");
      return;
    }

    const result = eval(equation);
    if (isNaN(result)) {
      alert("Something went wrong :(");
      return;
    }
    Clear();
    input.value = equation = currentNumber = "" + result;
    lastInput = ("" + equation).slice(-1);
  }
}

function SetCaretPosition(el, pos) {
  el.focus();
  el.setSelectionRange(pos, pos);
}
