const slider = document.getElementById('slide')
const sliderValue = document.getElementById('slider-value')
const display = document.getElementById('display')
const alertMsg = document.getElementById('alertMsg')
const copiedMsg = document.getElementById('copied')

let combination = {
    numbers: {
        status: true,
        chars: Array.from('0123456789')
    },
    letters: {
        status: true,
        chars: Array.from('abcdefghijklmnopqrstuvwxyz')
    },
    mixedCase: {
        status: true,
        chars: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    },
    punctuation: {
        status: true,
        chars: Array.from('!@#$%^&*()-_=+[{]}<>/?')
    }
}
let pwdLength = 9;   // default is 9


const showAlert = () => {
    alertMsg.style.display = "block";
}

const hideAlert = () => {
    alertMsg.style.display = "none";
}

const generatePassword = () => {
    let newPwd = "";

    let allowedCombination = Object.values(combination).filter(element => element.status === true)

    if (allowedCombination.length === 0) {
        showAlert();
        return;
    }

    for (let i = 0; i < pwdLength; i++) {

        let chars = allowedCombination[Math.trunc(Math.random() * allowedCombination.length)].chars;

        let curChar = chars[Math.trunc(Math.random() * chars.length)]
        newPwd = newPwd + curChar;
    }

    display.value = newPwd;
}

// update password length 
slider.addEventListener('input', (e) => {
    sliderValue.innerHTML = e.target.value;
    pwdLength = Number(e.target.value);
    generatePassword();
})

// update combination
const checkBoxes = document.getElementById('checkBoxes');
checkBoxes.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
        combination[e.target.id].status = e.target.checked;
        hideAlert();
        generatePassword();
    }
})

// handle copy to clipboard 
let timeOut = null;
const copyToClipboard = document.getElementById('copy-password')
copyToClipboard.addEventListener('click', async () => {
    await navigator.clipboard.writeText(display.value);
    copiedMsg.style.display = 'block';

    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        copiedMsg.style.display = 'none';
    }, 3000);           // hide the toast automatically after 3 sec
})


generatePassword();