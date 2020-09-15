
let theInput = document.getElementById("theResult");


function theAdding(num) {
  
  theInput.value += num;
 
}


function equal() {
            
  theInput.value = eval(theInput.value);    

    
}


function theReturn() {
  theVal = theInput.value;
    
theInput.value = theVal.substring(0,theVal.length - 1);   
    
}

