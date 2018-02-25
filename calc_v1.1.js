console.log("started!")

var expressionStr = ""; 
var lastChar = "";
var expressionArrItem = "";
var expressionArr = [];
// check if calculate or not
var isCalc = false;
var getNum = document.getElementsByClassName("num");
var getOperator = document.getElementsByClassName("operator");
var getTextBox = document.getElementById("input");
var getButton = document.getElementsByTagName("button");
var getZero = document.getElementById("zero");
var getEqual = document.getElementById("equal");
var getExpression = document.getElementsByClassName("outputExpression");
var getResult = document.getElementsByClassName("outputResult");
var getAC = document.getElementById("ac");
var getCE = document.getElementById("ce");

// Num event listener
// from function covert array-like obj to array.
Array.from(getNum).forEach(function(val){
    val.addEventListener("click", printNum.bind(this, val));
});

// Operator event listener
Array.from(getOperator).forEach(function(val){
    val.addEventListener("click", printOperator.bind(this, val));
});

// equal button event listener
getEqual.addEventListener("click", printResults.bind(this, getEqual));

// AC button event listener
getAC.addEventListener("click", handleAC.bind(this, getAC));

// CE button event listener
getCE.addEventListener("click", handleCE.bind(this, getCE));


// handle AC
function handleAC() {
    getExpression[0].textContent = "0";
    getResult[0].textContent = "";
    expressionStr = ""; 
    lastChar = "";
    expressionArr = [];
    expressionArrItem = "";
} 

// handle CE
function handleCE() {
    if(/[0-9.]/g.test(lastChar)){
        expressionStr = expressionStr.substring(0, expressionStr.lastIndexOf(expressionArrItem));
        expressionArrItem = "";
        lastChar = expressionArrItem[expressionArrItem.length - 1];
        expressionStr === "" ? getExpression[0].textContent = 0 : getExpression[0].textContent = expressionStr;        
    }
}

// handle numbers
function printNum(button) {
    if(!isCalc){
        //check is "."
        if(button.innerText == "."){
            isDot();
        } else if(button.innerText == "0"){
            isZero();
        } else {
            expressionArrItem += button.innerText;
            expressionStr += button.innerText;
            lastChar = expressionArrItem[expressionArrItem.length - 1];
        }
        expressionStr === "" ? getExpression[0].textContent = 0 : getExpression[0].textContent = expressionStr;        
        console.log(expressionArrItem, expressionStr, lastChar, expressionArr);
        } 
    else {
        isCalc = false;
        getResult[0].textContent = "";        
        expressionArr = [];
        if(button.innerText == "."){
            isDot(expressionArrItem);
        } else if(button.innerText == "0") {
            isZero(expressionArrItem);
        }else {
            expressionArrItem += button.innerText;
            lastChar = expressionStr[expressionStr.length - 1];
        }
        console.log(expressionArrItem, expressionStr, lastChar, expressionArr);
        expressionStr += expressionArrItem;
        expressionStr === "" ? getExpression[0].textContent = 0 : getExpression[0].textContent = expressionStr;        
        
    }
}

function isZero() {
        //there is dot or there are 1-9 before
        if(expressionArrItem.lastIndexOf(".") !== -1 || /[1-9]/g.test(expressionArrItem)){
            expressionArrItem += 0;
            expressionStr += 0;
            lastChar = expressionArrItem[expressionArrItem.length - 1]; 
        }
    }

function isDot(){
    if(expressionArrItem === ""){
        expressionArrItem += "0.";
        expressionStr += "0."
    } else if(expressionArrItem.indexOf(".") === -1) {
        expressionArrItem += ".";
        expressionStr += "."
    }
    lastChar = expressionArrItem[expressionArrItem.length - 1];
}

// handle operator
function printOperator(button) {
    if(lastChar != ""&& /[0-9]/g.test(lastChar)){
        if(!isCalc){
            expressionArr.push(expressionArrItem);
        }  
        if(button.id === "div"){
            expressionArr.push("/");
            lastChar = "/";
            expressionStr += String.fromCharCode(247);
            getExpression[0].textContent = expressionStr; 
        } else if(button.id === "multi"){
            expressionArr.push("*");
            lastChar = "*";
            expressionStr += String.fromCharCode(215); 
            getExpression[0].textContent = expressionStr;
        } else {
            expressionArr.push(button.innerHTML);
            lastChar = button.innerHTML;
            expressionStr += button.innerHTML;
            getExpression[0].textContent = expressionStr;
        }
        isCalc = false;
        expressionArrItem = ""
        console.log(expressionArrItem, expressionStr, lastChar, expressionArr);
    }
}

// handle calc results
function printResults(equalButton) {
    if(lastChar != "" && /[0-9]/.test(lastChar)){
        expressionArr.push(expressionArrItem);
        expressionArrItem = ""
        calcResults(expressionArr);
    }
}

// handle calcs
// bug found if use below regex 1+1*1*1*1*1 will become [1, +, 1*1, *, 1*1, *, 1]
//  var expArr = expression.replace(/([0-9])([-+/*\/])([0-9])/g, '$1 $2 $3').split(' ');
// one solution is scan twice first seperate 1* to 1 * then seperate *1 to * 1.
    // var expArr = expression.replace(/([0-9])([-+/*\/])/g, '$1 $2');
    // expArr = expArr.replace(/([-+/*\/])([0-9])/g, '$1 $2').split(' ');
    // console.log(expArr);

    // find the index of high priority operator then calc with index-1 and index+1 then splice into the array

    // expArr.indexOf("/*|\//g")

function calcResults(arr) {
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
    //Print result into outputResult div
    getResult[0].textContent = arr[0];
    //Print expression into outputExpression div
    getExpression[0].textContent = expressionStr + '=' + arr[0];
    //refresh the expressionStr value to current result.
    expressionStr = arr[0];    
    expressionArr = [];
    expressionArr.push(arr[0]);
    expressionArrItem = "";
    isCalc = true;
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

// recursion demo
// var stripeArr = function(val) {
//     if(!Array.isArray(val)){
//       newArr.push(val);
//     } else{
//       for(var i in val){
//         stripeArr(val[i]);
//       }
//     }   
//   };

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

// function printHello() {
//     console.log("hello");
// }



// function printButtonValue() {
//     printEquation = 
//     getTextBox.value = "test";
// }
// document.getElementById("seven").innerText
// document.getElementsByTagName("button");

// handle zero
// if(lastChar == "." || /[0-9]/){
        
// }