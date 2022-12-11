// CARDHOLDER NAME
let nameCard = document.querySelector('.card__details-name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');

// CARD NUMBER
let numberCard = document.querySelector('.card__number');
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

// CARD MONTH
let monthCard = document.querySelector('.card__month');
let monthInput = document.querySelector('#cardMonth');
let monthErrorDiv = document.querySelector('.form__input-mm--error');

// CARD YEAR
let yearCard = document.querySelector('.card__year');
let yearInput = document.querySelector('#cardYear');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

//CARD CVC
let cvcCard = document.querySelector('.card-back__cvc');
let cvcInput = document.querySelector('#cardCVC');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');


// Input dinamic name
nameInput.addEventListener('input', ()=>{
    if(nameInput.value == ''){
        nameCard.innerText = 'JANE APPLESEED'
    }else{
        nameCard.innerText = nameInput.value;
    }
    
});

// Input dinamic number
numberInput.addEventListener('input', event=>{

    let inputValue = event.target.value;

    numberCard.innerText = numberInput.value;

    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');
    }else{
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrorDiv, '',false);
    }

    if(numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000';
    }

});

// Input dinamic month
monthInput.addEventListener('input', ()=>{
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv);
});

// Input dinamic year
yearInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
});

// Input dinamic cvc
cvcInput.addEventListener('input', ()=>{
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});


// Confirm Button
let confirmBtn = document.querySelector('.form__submit');

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Form and Thanks section

let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');


confirmBtn.addEventListener('click', event=>{
    event.preventDefault();
    console.log(parseInt(monthInput.value));

    // name validation
    if(verifyIsFilled(nameInput, nameErrorDiv)){
        nameValidation = true;
    }else{
        nameValidation = false;
    }

    // number validation
    if(verifyIsFilled(numberInput, numberErrorDiv) == true){
        if(numberInput.value.length == 19){
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        }else{
            showError(numberInput, numberErrorDiv, 'Wrong number');
            numberValidation = false;
        }
    }
    
    //month validation
    if(verifyIsFilled(monthInput, monthErrorDiv)){
        if(parseInt(monthInput.value)>0 && parseInt(monthInput.value)<=12){
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        }else{
            showError(monthInput, monthErrorDiv, 'Wrong Month');
            monthValidation = false;
        }
    }

    // year validation
    if(verifyIsFilled(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value)>22 && parseInt(yearInput.value)<=27){
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        }else{
            showError(yearInput, yearErrorDiv, 'Wrong year');
            yearValidation = false;
        } 
    }

    // cvc validation
    if(verifyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length == 3){
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
            cvcValidation = false;
        }
    }

    if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true){
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
});


// Functions

function showError(divInput, divError, msgError,show = true){
    if(show){
        divError.innerText = msgError;
    divInput.style.borderColor = '#ff0000';
    }else{
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError){
    if(divInput.value.length>0){
        showError(divInput, divError,"", false);
        return true;
    }else{
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}

function validateLetters(input, divError){
    let regExp = /[A-z]/g;
    if(regExp.test(input.value)){
        showError(input, divError, 'Wrong format, numbers only');
    }else{
        showError(input, divError, '', false);
    }
}
