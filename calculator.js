/*
@author: Kara Byers, 
@version: 9/27/21, CIS 371 01
Running calculator 
*/

//Creates readline 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//Creates running total value starting at 0
var total = 0;

//Function asks user for operation and sends it to check operation function
function getOperator(){
    readline.question('Enter operation (+-*/ or q to quit): ', userOp => {
        checkOperation(userOp);
    } );
}

/*
Function asks user for value and checks that input is a number
sends number and operator to perform math if valid number
@param operator user operator as a string
*/
function getValue(operator){
    readline.question('Enter a number: ', userNum => {
        if (isNaN(userNum)){
            console.log("Please enter input as a number.");
           
            //have program re ask for a value
            getValue(operator);
        } else {
            performMath(operator, total, userNum);
        }
    });
}


/*
Function checks if division by zero
@param operation user operator as a string
@param userValue user value as a number
@return true if dividing by zero
*/
function divideByZero(operation, userValue){
    if (operation == '/' && userValue == 0){
        return true;
    } else {
        return false;
    }
}

/*
Function checks if operation is valid, if q quit,
if valid then calls for value, if not then restarts
@param operation user operator as a string
*/
function checkOperation(operation){
    if (operation === 'q'){
        console.log("Final total: ", total)
        process.exit(0);
    } else if (operation == '+' || operation == '-' ||
               operation == '*' || operation == '/' ){
        getValue(operation);
    } else {
        console.log("Invalid operator, accepted operators are + - * / or q to quit");
        
        //has program start again from beginning
        getOperator();
    }
}

/*
Function performs math operation and restarts program
@param operation user operator as a string
@param valueOne current total value 
@param valueTwo user inputted value 
*/
function performMath(operation, valueOne, valueTwo){
    valueOne = Number(valueOne);
    valueTwo = Number(valueTwo);
    
    //first checks if divide by zero
    if (divideByZero(operation, valueTwo)) {
        console.log("Cannot divide by zero, please start again.");
        
        //have it start from beginning asking for operation
        getOperator();
    } else {
        
        //performs operation
        if (operation === '+'){
            total = valueOne + valueTwo;
            console.log('Your current total is: ', total);
            getOperator();
        } else if (operation === '-') {
            total = valueOne - valueTwo;
            console.log('Your current total is: ', total);
            getOperator();
        } else if (operation === '*'){
            total = valueOne * valueTwo;
            console.log('Your current total is: ', total);
            getOperator();
        } else if (operation === '/') {
            total = valueOne / valueTwo;
            console.log('Your current total is: ', total);
            getOperator();
        }
    } 
} 

//Start program by printing introduction and asking for operator
console.log("Welcome to calculator.js");
console.log("Current total: ", total); 

getOperator();
