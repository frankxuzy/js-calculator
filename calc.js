console.log("started!")
// document.addEventListener("DOMContentLoaded", function(event) {
    
// });

// document.getElementById("ac").addEventListener("click", dosomething);
var printExpression = ""; 
var lastChar = "";
// var getSeven = document.getElementById("seven");
var getNum = document.getElementsByClassName("num");

// function init() {
//     console.log("DOM fully loaded and parsed");

//     console.log("Buttons in itialzw");
// }

var getOperator = document.getElementsByClassName("operator");
var getTextBox = document.getElementById("input");
var getButton = document.getElementsByTagName("button");
var getZero = document.getElementById("zero");
var getEqual = document.getElementById("equal");

Array.from(getNum).forEach(function(val){
    val.addEventListener("click", printNum.bind(this, val));
});

Array.from(getOperator).forEach(function(val){
    val.addEventListener("click", printOperator.bind(this, val));
});

getEqual.addEventListener("click", calcResults.bind(this, getEqual));

// handle numbers
function printNum(button) {
    printExpression += button.innerText;
    lastChar = printExpression[printExpression.length - 1];
    console.log(printExpression, lastChar);
}

// handle operator
function printOperator(button) {
    if(lastChar != ""&& /[0-9]/g.test(lastChar)){
        if(button.id === "div"){
            printExpression += "/";
            lastChar = printExpression[printExpression.length - 1];
        } else if(button.id === "multi"){
            printExpression += "*";
            lastChar = printExpression[printExpression.length - 1];
        } else {
            printExpression += button.innerHTML;
            lastChar = printExpression[printExpression.length - 1];
        }

        console.log(printExpression, lastChar);
    }
    // if(lastChar === /&divide;/g){
    //     console.log("find it")
    // }
}

// handle calc results
function calcResults(equalButton) {
    if(lastChar != "" && /[0-9]/.test(lastChar)){
        calculate(printExpression);
    }
}

// handle calcs
function calculate(expression) {
    // (?<=...) means look-behind assertion, and (?=...) means look-ahead assertion.
    // var expArr = expression.split("+");
    // var expArr = expression.split("/(?<=[-+*\/])|(?=[-+*\/])/g");
    var expArr = expression.replace(/([0-9])([-+*\/])([0-9])/g, '$1 $2 $3').split(' ');
    console.log(expArr);

    // find the index of high priority operator then calc with index-1 and index+1 then splice into the array
    var calcResults = function(arr) {
        while(arr.length > 2) {
            var operatorIdx = highPriorityOperatorIndex(arr, "*", "/");
            var subExpression =[];
            var subExpressionResults;
            if(operatorIdx !== -1){
                // array.slice selected from begin to end (end not included).
                subExpression = arr.splice(operatorIdx - 1, operatorIdx + 2).join("");
                subExpressionResults = eval(subExpression);
                arr.splice(operatorIdx - 1, 0, subExpressionResults);
                console.log(arr);
            } else {
                subExpression = arr.splice(0, 3).join("");
                subExpressionResults = eval(subExpression);
                arr.splice(0, 0, subExpressionResults);
            }
        }
        console.log(arr[0]);
    }

    calcResults(expArr);
    // expArr.indexOf("/*|\//g")


}

// find the operator with high priority 
function highPriorityOperatorIndex(arr, opera1, opera2){
    if(arr.indexOf(opera1) !== -1 && arr.indexOf(opera2) !== -1){
        return Math.min(arr.indexOf(opera1), arr.indexOf(opera2));
    } else if(arr.indexOf(opera1) !== -1) {
        return arr.indexOf(opera1);
    } else if(arr.indexOf(opera2) !== -1) {
        return arr.indexOf(opera2);
    } else {
        return -1;
    }
}

var stripeArr = function(val) {
    if(!Array.isArray(val)){
      newArr.push(val);
    } else{
      for(var i in val){
        stripeArr(val[i]);
      }
    }   
  };

// Array.from(getButton).forEach(clickButton);

// getSeven.addEventListener("click", printButtonValue(getSeven), false);
// add eventlistener to all the num button
// Array.from(getNum).forEach(function(val){
//     val.addEventListener("click", printButtonValue);
// });

// add eventlistener to all the num button
// Array.from(getOperator).forEach(function(val){
//     val.addEventListener("click", printButtonValue);
// });

// function clickButton(button) {
//     button.addEventListener("click", function(val) {
//         console.log(val.innerText);
//     });
// }

// map(function(val){
//     addEventListener("click", printHello);
// });
// getOperator.addEventListener("click", printHello);

function printHello() {
    console.log("hello");
}



// function printButtonValue() {
//     printEquation = 
//     getTextBox.value = "test";
// }
// document.getElementById("seven").innerText
// document.getElementsByTagName("button");

// handle zero
// if(lastChar == "." || /[0-9]/){
        
// }

