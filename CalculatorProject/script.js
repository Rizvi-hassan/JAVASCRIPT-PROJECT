const numbers = document.querySelector('.numbers');
const displayText = document.getElementById('display-text')

let currentNo = "0";
let operand1 = 0;
let operand2 = 0;
let operator = "";
let isResult = false;   // true if currentNo is a result of expression else false

const operations = {
    mod: (a, b) => (a % b),
    add: (a, b) => (a + b),
    subtract: (a, b) => (a - b),
    divide: (a, b) => (a / b),
    multiply: (a, b) => (a * b),
    exp: (a, b) => (Math.pow(a, b))
}

const insertDigit = (digit) => {
    if (isResult) {
        currentNo = digit;
        isResult = false;
    } else {
        currentNo = currentNo === '0' ? digit : currentNo + digit;  // adding digits as string
    }
    displayText.textContent = currentNo;
}

// add enter number event listener
numbers.addEventListener('click', (e)=>{
    if (e.target.tagName === 'BUTTON') {
        if (e.target.id !== 'calculate') {  
            insertDigit(e.target.id) 
        }
    }
})

// handle delete operation 
const deleteBtn = document.getElementById('del');
deleteBtn.addEventListener('click', ()=> {
    currentNo = currentNo.length === 1 ? "0" : currentNo.slice(0, -1);
    displayText.textContent = currentNo;
})

// handle clear operation
const clearScreen = document.getElementById('clear-screen');
clearScreen.addEventListener('click', ()=> {
    currentNo = "0";
    operand1 = 0;
    operand2 = 0;
    displayText.textContent = currentNo;
})

// handle operator inputs 
const operatorIps = document.querySelector('.operations');
operatorIps.addEventListener('click', (e) => {
    if(e.target.classList.contains('operator')) {
        operator = e.target.id;
        operand1 = Number(currentNo);
        currentNo = "0";
        displayText.textContent = currentNo;
    }
})

// handle calculate operation
const calculateBtn = document.getElementById('calculate');
calculateBtn.addEventListener('click', (e)=> {
    operand2 = Number(currentNo);
    let res = operations[operator]?.(operand1, operand2);
    currentNo = res.toString();
    displayText.textContent = currentNo;
    isResult = true;
})