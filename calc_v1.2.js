console.log("started!")

var expressionStr = ""; 
var lastChar = "";
var expressionArrItem = "";
var expressionArr = [];
// check if calculate or not
var isCalc = false;

var getNum = document.getElementsByClassName("num");
var getOperator = document.getElementsByClassName("operator");
var getEqual = document.getElementById("equal");
var getExpression = document.getElementsByClassName("outputExpression");
var getResult = document.getElementsByClassName("outputResult");
var getAC = document.getElementById("ac");
var getCE = document.getElementById("ce");
var getNegative = document.getElementById("negative");

function calc_init() {
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
    // minus button event listener
    getNegative.addEventListener("click", handleNegative.bind(this, getNegative));
    keypressEventListener()
}

function checkCurrentData() {
    console.log("expressionStr", "expressionArrItem", "lastChar", "expressionArr", "isCalc");    
    console.log(expressionStr, expressionArrItem, lastChar, expressionArr, isCalc);    
}

//key press event listener
function keypressEventListener(){
    document.addEventListener("keypress", function(event){
        console.log(event.keyCode);
        if(/46|4[8-9]|5[0-7]/g.test(event.keyCode)){
            console.log(event.keyCode);
            Array.from(getNum).forEach(function(val){
                if(val.innerText === String.fromCharCode(event.keyCode)){
                    printNum(val);
                }
            });
        } else if(/42|43|45|47/g.test(event.keyCode)) {
            Array.from(getOperator).forEach(function(val){
                if(val.innerText === String.fromCharCode(event.keyCode)){
                    printOperator(val);
                } else if(event.keyCode == 42) {
                    printOperator(document.getElementById("multi"));
                } else if(event.keyCode == 47) {
                    printOperator(document.getElementById("div"));
                }
            });
        } else if(event.keyCode == 13 || event.keyCode == 61) {
            printResults(getEqual);
        }
    });
}


function handleNegative(){
    if(!isCalc){
        if(/[0-9]/g.test(lastChar) && expressionArrItem.indexOf("-") !== 0){
            //remove the previous num input
            expressionStr = expressionStr.substring(0, expressionStr.lastIndexOf(expressionArrItem));
            expressionStr += ("(-" + expressionArrItem + ")");
            expressionArrItem = "-" + expressionArrItem;
            lastChar = expressionArrItem[expressionArrItem.length - 1];
            checkCurrentData();
            getExpression[0].textContent = expressionStr;        
        } else if(expressionArrItem.indexOf("-") === 0){
            expressionStr = expressionStr.substring(0, (expressionStr.lastIndexOf(expressionArrItem) - 1));
            expressionArrItem = expressionArrItem.substring(1);
            lastChar = expressionArrItem[expressionArrItem.length - 1];        
            checkCurrentData();
            expressionStr += expressionArrItem;
            getExpression[0].textContent = expressionStr;   
        }
    } else {
        if(/[0-9]/g.test(lastChar) && expressionArr[expressionArr.length - 1].toString().indexOf("-") !== 0){
            expressionStr = ("(-" + expressionArr[expressionArr.length - 1]+ ")");
            expressionArrItem = "-" + expressionArr[expressionArr.length - 1];
            lastChar = expressionArrItem[expressionArrItem.length - 1];        
            expressionArr = [];
            expressionArr.push(expressionArrItem);
            getExpression[0].textContent = expressionStr;    
            checkCurrentData()
            
        } else if(lastChar !== "" && expressionArr[expressionArr.length - 1].toString().indexOf("-") === 0){
            expressionArrItem = expressionArr[expressionArr.length - 1].toString().substring(1);
            lastChar = expressionArrItem[expressionArrItem.length - 1].toString();        
            expressionArr = [];
            expressionArr.push(expressionArrItem);
            expressionStr = expressionArrItem;
            getExpression[0].textContent = expressionStr;
            checkCurrentData()
        }
    }

}

// handle AC
function handleAC() {
    getExpression[0].textContent = "0";
    getResult[0].textContent = "";
    expressionStr = ""; 
    lastChar = "";
    expressionArr = [];
    expressionArrItem = "";
    isCalc = false;
} 

// handle CE
function handleCE() {
    if(/[0-9.]/g.test(lastChar)){
        if(expressionArrItem !== ""){
            expressionStr = expressionStr.substring(0, expressionStr.lastIndexOf(expressionArrItem));
            expressionArrItem = "";
            lastChar = expressionStr[expressionStr.length - 1];
        } else {
            expressionStr = "";
            expressionArr = [];
            lastChar = "";
            getResult[0].textContent = "";
            
        }
        checkCurrentData()  
        expressionStr === "" ? getExpression[0].textContent = 0 : getExpression[0].textContent = expressionStr;        
    }
}

// handle numbers
function printNum(button) {
    if(button.innerText == "."){
        printDot();
    } else if(button.innerText == "0"){
        printZero();
    } else if(isCalc === false){
        expressionArrItem += button.innerText.toString();
        expressionStr += button.innerText.toString();
        lastChar = expressionArrItem[expressionArrItem.length - 1];
    } else if(isCalc === true) {
        getResult[0].textContent = "";        
        expressionArrItem = ""
        expressionArr = [];
        expressionArrItem = button.innerText.toString();
        expressionStr = button.innerText.toString();
        lastChar = expressionArrItem[expressionArrItem.length - 1];
        isCalc = false;
    }
    checkCurrentData()    
    expressionStr === "" ? getExpression[0].textContent = 0 : getExpression[0].textContent = expressionStr;            
}

// handle operator
function printOperator(button) {
    if(lastChar != ""&& /[0-9]/g.test(lastChar)){
        if(!isCalc){
            expressionArr.push(expressionArrItem);
        }  
        pushOpInArr(button);
        getExpression[0].textContent = expressionStr;        
        isCalc = false;
        expressionArrItem = "";
        checkCurrentData()
    } else if(/([-+/*\/])/g.test(lastChar)){
        expressionArr.pop();        
        replaceOpInArr(button);
        getExpression[0].textContent = expressionStr;                    
        checkCurrentData()
    }
}

// handle calc results
function printResults(equalButton) {
    if(lastChar != "" && /[0-9]/.test(lastChar)){
        expressionArr.push(expressionArrItem);
        expressionArrItem = ""
        calcResults(expressionArr);
        checkCurrentData()        
    }
}

// handle calcs
function calcResults(arr) {
    while(arr.length > 2) {
        var operatorIdx = highPriorityOperatorIndex(arr, "*", "/");
        var subExpression =[];
        var subExpressionResults;
        if(operatorIdx !== -1){
            // array.slice selected from begin to end (end not included).
            subExpression = arr.splice(operatorIdx - 1, 3).join("");
            subExpressionResults = eval(subExpression);
            arr.splice(operatorIdx - 1, 0, subExpressionResults);
        } else {
            subExpression = arr.splice(0, 3).join("");
            subExpressionResults = eval(subExpression);
            arr.splice(0, 0, subExpressionResults);
        }
    }
    //Print result into outputResult div
    getResult[0].textContent = arr[0];
    //Print expression into outputExpression div
    getExpression[0].textContent = expressionStr + '=' + arr[0];
    //refresh the expressionStr value to current result.
    expressionStr = arr[0];    
    expressionArr = [];
    expressionArr.push(arr[0]);
    expressionArrItem = arr[0].toString();
    lastChar = expressionArrItem[expressionArrItem.length - 1];
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


function printZero() {
    //there is dot or there are 1-9 before
    if(expressionArrItem.lastIndexOf(".") !== -1 || /[1-9]/g.test(expressionArrItem)){
        expressionArrItem += 0;
        expressionStr += 0;
        lastChar = expressionArrItem[expressionArrItem.length - 1]; 
    }
}

function printDot(){
    if(expressionArrItem === ""){
        expressionArrItem += "0.";
        expressionStr += "0."
    } else if(expressionArrItem.indexOf(".") === -1) {
        expressionArrItem += ".";
        expressionStr += "."
    }
    lastChar = expressionArrItem[expressionArrItem.length - 1];
}

function pushOpInArr(button) {
    if(button.id === "div"){
        expressionArr.push("/");
        lastChar = "/";
        expressionStr += String.fromCharCode(247);
    } else if(button.id === "multi"){
        expressionArr.push("*");
        lastChar = "*";
        expressionStr += String.fromCharCode(215); 
    } else {
        expressionArr.push(button.innerHTML);
        lastChar = button.innerHTML;
        expressionStr += button.innerHTML;
    }
}

function replaceOpInArr(button) {
    if(button.id === "div"){
        expressionArr.push("/");
        lastChar = "/";
        replaceLastChar(expressionStr, String.fromCharCode(247));
    } else if(button.id === "multi"){
        expressionArr.push("*");
        lastChar = "*";
        replaceLastChar(expressionStr, String.fromCharCode(215));            
    } else {
        expressionArr.push(button.innerHTML);
        lastChar = button.innerHTML;
        replaceLastChar(expressionStr, button.innerHTML);                        
    }
}

function replaceLastChar(str, replaceTo){
    str = str.substring(0, str.length - 1);
    str += replaceTo;
    expressionStr = str;
}

calc_init();