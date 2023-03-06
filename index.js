// password field
let passwordField = document.getElementById('myInput');

// button 
let button = document.getElementById('generate');

//check box 
let lowerCheckBox = document.getElementById('t1');
let upperCheckBox = document.getElementById('t2');
let numberCheckBox = document.getElementById('t3') ;
let symbolsCheckBox = document.getElementById('t4') ;
let duplicatesCheckBox = document.getElementById('t5') ;
let selectAllBox = document.getElementById('t6') ;




// Slider
let totalRange = document.getElementById('range');

// length span
let passwordLength = document.getElementById('cnt');

// copy button
let copy = document.getElementById('copy');

// the password string

// Letters 

let upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let lowerLetter = 'abcdefghijklmnopqrstuvwxyz';
let allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let symbols = '!@#$%^&*_';
let numbers = '0123456789';
// constraints vars
let lower = false;
let number = false ; 
let upper = false ; 
let excludeDuplicates = false ; 
let spaces = false ; 
let symbolsBool = false ; 


// global vars

let noPassword = true;
let allowed = 0 ; 
let chosen = {};

//////////////////// Evemt listeners\\\\\\\\\\\\\\\\\


//  chek box
lowerCheckBox.addEventListener('click',()=>{    
    lower = !lower; 
    if (lower) { 
        allowed+=lowerLetter.length ; 
    }
    else { 
        allowed-=lowerLetter.length ; 
    }
    selectAllBox.checked = false ; 
});
upperCheckBox.addEventListener('click',()=>{    
    upper = !upper; 
    if (upper) { 
        allowed+=upperLetters.length ; 
    }
    else { 
        allowed-=upperLetters.length ; 
    }
    selectAllBox.checked = false ; 
});
numberCheckBox.addEventListener('click',()=>{    
    number = !number; 
    if (number) { 
        allowed+=numbers.length ; 
    }
    else { 
        allowed-=numbers.length ; 
    }
    selectAllBox.checked = false ; 
});
symbolsCheckBox.addEventListener('click',()=>{    
    symbolsBool = !symbolsBool;
    if (symbolsBool) { 
        allowed+=symbols.length ; 
    }
    else { 
        allowed-=symbols.length ; 
    }
    selectAllBox.checked = false ; 
});
duplicatesCheckBox.addEventListener('click',()=>{
    excludeDuplicates = !excludeDuplicates;
    selectAllBox.checked = false ; 
});


selectAllBox.addEventListener('click',function(){
    if (selectAllBox.checked === true) { 
        lowerCheckBox.checked = true ;
        upperCheckBox.checked = true ;
        numberCheckBox.checked = true ;
        symbolsCheckBox.checked = true ;
        duplicatesCheckBox.checked = true ;
        lower = true; 
        upper = true  ; 
        number = true ; 
        symbolsBool = true ;
        excludeDuplicates = true ;  
        allowed = symbols.length + lowerLetter.length * 2 + numbers.length ;  
    }
    else { 
        lowerCheckBox.checked = false ;
        upperCheckBox.checked = false ;
        numberCheckBox.checked = false ;
        symbolsCheckBox.checked = false ;
        duplicatesCheckBox.checked = false ;
        lower = false; 
        upper = false ; 
        number = false ; 
        symbolsBool = false ;
      
        allowed = 0 ;   
        excludeDuplicates = false ;  
    }
})


// button event
button.addEventListener('click',()=>{
    let Password =  generateYourPassword();
    if (parseInt(totalRange.value ) > allowed && excludeDuplicates && allowed > 0 ) { 
        totalRange.value = allowed ; 
        console.log(555555);
        passwordLength.textContent = allowed;
        passwordField.value = ""
        passwordField.setAttribute('placeholder','You have reached maximum range !');
        noPassword = true;
    }
    else {
        if(Password != undefined )
        { 
            copy.style.color = '#437dd5';
            passwordField.value = Password;
            noPassword = false;
        }
        else{
            copy.style.color = 'rgb(217 217 217)';
            noPassword = true;
            passwordField.value = '';
            passwordField.setAttribute('placeholder','Please check at least one option!');
        }
    }
   
    lowerLetter = 'abcdefghijklmnopqrstuvwxyz';
    upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    symbols = '!@#$%^&*_';
    numbers = '0123456789';
    
})

// slider range event
totalRange.addEventListener('input',()=>{
    passwordLength.textContent = totalRange.value;
})

// copy button event
copy.addEventListener('click',()=>{
    if(!noPassword){
        navigator.clipboard.writeText(passwordField.value);
        alert('Password Copied!');
    }

});

// generate random char 

function randomChar(){
    return  allLetters.charAt(Math.floor(Math.random() * allLetters.length)) ;
    
}

// generate random symbols
function randomElement(letters){
    return  letters.charAt(randomNumber(0,letters.length-1))  ;
}


// generate random number with range
function randomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}


/////generate Passwords 
function generateYourPassword() { 
    let length = totalRange.value ; 
    let password = "" ; 
     
    if(lower || upper || symbolsBool || number){

        while(length>0) { 
            let op = randomNumber(1,4) ;
            if (op == 1 && lower === true) {
                let letter = randomElement(lowerLetter) 
                password +=  letter;
                if(excludeDuplicates)
                    lowerLetter =  lowerLetter.replace(letter,'');
                length-- ; 
                continue;
            }
            if (op == 2 && upper === true) {
                let letter = randomElement(upperLetters) ; 
                password +=  letter;
                if(excludeDuplicates)
                    upperLetters = upperLetters.replace(letter,'');
                length-- ; 
            }
            if (op == 3 && symbolsBool === true) {
                let letter = randomElement(symbols) ; 
                password +=  letter;
                if(excludeDuplicates)
                    symbols =  symbols.replace(letter,'');
                
                length-- ; 
            }
            if (op == 4 && number === true) {
                let letter =  randomElement(numbers) ; 
                password += letter;
                if(excludeDuplicates)
                    numbers = numbers.replace(letter,'');
                length-- ; 
            }
        }
        return password ; 
    }
}

