'use strict';

// UI variables
const tipValue = document.querySelector('.tip');
const totalValue = document.querySelector('.total');
const calculatorForm = document.querySelector('.calculator-form');
const clearResultsBtn = document.querySelector('.form-btn.clear-btn');
const billAmountInput = document.getElementById('bill_amount');
const tipRateInput = document.querySelector('.slider');

// set globals
let tip = 0;
let total = 0;

const init = () => {
    tipValue.innerHTML = 'Tip: 0';
    totalValue.innerHTML = 'Total: 0';
}

init();

const clearFields = () => {
    // little delay before clearing the inputs
    setTimeout(() => {
        billAmountInput.value = '';
    }, 1500);
}

const calculate = (billAmount, tipRate) => {
    tip = billAmount * (tipRate / 100);
    total = billAmount + tip;

    displayResults(tip, total);
}

const displayResults = (tip_value, total_value) => {
    tipValue.innerHTML = `Tip: ${tip_value}`;
    totalValue.innerHTML = `Total: ${total_value}`;
}

const showMessage = (messageBox, messageValue, messageText, msgColor) => {
    document.querySelector(`.${messageBox}`).style.display = 'block';
    document.querySelector(`.${messageValue}`).textContent = messageText;
    document.querySelector(`.${messageBox}`).style.backgroundColor = msgColor;
}

const clearResults = () => {
    tipValue.innerHTML = 'Tip: 0';
    totalValue.innerHTML = 'Total: 0';
}

// calculate
calculatorForm.addEventListener('submit', e => {
    e.preventDefault();

    const bill_amount = Number(billAmountInput.value);
    const tip_rate = Number(tipRateInput.value);

    if (bill_amount && tip_rate && bill_amount > 0 && tip_rate > 0) {
        calculate(bill_amount, tip_rate);

        clearFields();
    } else if (bill_amount < 0) {
        showMessage('message-box', 'message', "Please don't use negative numbers", 'rgb(148, 90, 90)');

        // clear message after 3 seconds
        setTimeout(() => {
            showMessage('message-box', 'message', '', 'whitesmoke');
        }, 3000);

        clearFields();
    } else {
        showMessage('message-box', 'message', 'Please fill in both fields', 'rgb(148, 90, 90)');

        // clear message after 3 seconds
        setTimeout(() => {
            showMessage('message-box', 'message', '', 'whitesmoke');
        }, 3000);
    }

});

// clear the results
clearResultsBtn.addEventListener('click', clearResults);