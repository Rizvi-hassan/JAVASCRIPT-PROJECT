const form = document.forms['form']
const fromSelect = document.getElementById('from')
const toSelect = document.getElementById('to')
const errElement = document.getElementById('error')
const resElement = document.getElementById('result')

const addCountryOption = (country) => {
    let flag = country.flag;
    let name = country.name.common;
    let code = Object.keys(country.currencies)[0];

    
    // create option elements
    let fromOption = document.createElement('option');
    fromOption.value = code;
    fromOption.textContent = `${flag} ${code} - ${name}`

    let toOption = document.createElement('option');
    toOption.value = code;
    toOption.textContent = `${flag} ${code} - ${name}`

    fromSelect.appendChild(fromOption);
    toSelect.appendChild(toOption);
}

// fetch country name, code and flag
const fetchCountry = async ()=> {
    try{
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flag');

        if (!response.ok){
            throw new Error("Failed to fetch Country codes");
        }

        const data = await response.json();
        data.forEach(element => {
            addCountryOption(element);
        });
    } catch (error) {
        errElement.innerHTML = error;
    }
}

fetchCountry();

const convertCurrency = async (from, to, amt) => {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/584636d596e7725613d4cfa8/pair/${from}/${to}`);

        if (!response.ok) {
            throw new Error("Failed to convert currency.");
        }

        const {conversion_rate} = await response.json();
        resElement.textContent = `${amt} ${from} = ${amt*conversion_rate} ${to}`

    } catch (error) {
        errElement.innerHTML = error;
    }
}

// handle form submit 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let amt = form.elements['amount'].value;
    let baseCurrency = form.elements['from'].value;
    let exchangeCurrency = form.elements['to'].value;

    // console.log(amt, baseCurrency, exchangeCurrency);
    convertCurrency(baseCurrency, exchangeCurrency, amt);

})