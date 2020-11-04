
let theInput = document.getElementById("theResult");
let tabChar = [];
let error;
let symbol = document.querySelector('.symbol');
let equation = "";
function theAdding(char, _bool) {
  if(!error) {
    switch(_bool) {
      case true:
        theInput.value += char;
        break;
        default:
  
          if(theInput.value.length > 0) {
            tabChar.push(theInput.value);
            theInput.value = '';
  
            if(char == '*') {
              symbol.innerHTML  ='&times;'
            }
            
            else if(char == '/') {
              symbol.innerHTML  ='&#xf7;'
            }
            else {
              symbol.innerHTML  = char;
            }
            
            if(!isNaN(tabChar[tabChar.length - 1])) {
              tabChar.push(char);
            }
      
          }
          
    }
  }
  

 
}

function erase() {
  document.querySelector('#theResult').value = '';
  tabChar = [];
  symbol.innerHTML = '';
  error = false;
  equation = '';

}


function equal() {
 if(!error) {
  if(isNaN(tabChar[tabChar.length - 1]) && theInput.value == '' || tabChar.length == 0) {
    theInput.value = 'ERROR';
    error = true;
    symbol.innerHTML = '';
  }
  else {
    tabChar.push(theInput.value);
  }
  
  for(let i of tabChar) {
    let row = tabChar.indexOf(i); 
    equation += i;
    // alert(equation +" "+row);
  }
  // alert(equation);

  theInput.value = eval(equation);  
    
  equation = '';
  tabChar = [];
  symbol.innerHTML = '';  
 }
}


function theReturn() {
  
  if(!error) {
    theVal = theInput.value;  
  theInput.value = theVal.substring(0,theVal.length - 1);
  tabChar.pop();
  }
    
}

