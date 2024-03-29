const map = new Map();
map.set("+", 1);
map.set("-", 1);
map.set("*", 2);
map.set("/", 2);

const stackForNumber = [];
const stackForOperator = [];
var currentNumber = '';
var lastClick = '';
var currentOperator = '';
var prevOperator = '';
const resultBox = document.getElementById("result");

function numberClick(val){
    currentNumber += val;
    resultBox.innerHTML = currentNumber;
    lastClick = 'number';
}
function operator(val){
    if(lastClick === 'operator'){
        stackForOperator.pop();
        stackForOperator.push(val);
        currentOperator = val;
        return;
    }
    prevOperator = currentOperator;
    currentOperator = val;
    if(currentNumber !== ''){
        stackForNumber.push(currentNumber);
    }
    if(prevOperator == '/' && stackForNumber.at(-1) == 0){
        resultBox.innerHTML = "DIVIDE BY 0 ERROR";
        stackForNumber.splice(0, stackForNumber.length);
        stackForOperator.splice(0, stackForOperator.length);
        currentNumber = '';
        return;
    }

    while((stackForOperator.length > 0) && (map.get(val) < map.get(stackForOperator.at(-1)))){
        let num2 = Number(stackForNumber.pop());
        let num1 = Number(stackForNumber.pop());
        let operator = stackForOperator.pop();

        if(operator === "+"){
            stackForNumber.push(''+(num1 + num2));
        }
        else if(operator === "-"){
            stackForNumber.push(''+(num1 - num2));
        }
        else if(operator === "*"){
            stackForNumber.push(''+(num1 * num2));
        }
        else if(operator === "/"){
            stackForNumber.push(''+(num1 / num2));
        }
    }

    stackForOperator.push(val);
    currentNumber = '';
    resultBox.innerHTML = currentNumber;
    lastClick = "operator";
}

function reset(){
    stackForNumber.splice(0, stackForNumber.length);
    stackForOperator.splice(0, stackForOperator.length);
    currentNumber = '';
    resultBox.innerHTML = currentNumber;
}

function equal(){
    if(currentNumber != ''){
        stackForNumber.push(currentNumber);
    }
    while(stackForNumber.length > 0 || stackForOperator.length > 0){
        if(stackForNumber.length == 1){
            resultBox.innerHTML = stackForNumber.at(-1);
            lastClick = "number";
            currentNumber = '';
            return;
        }
        if(stackForOperator.length == 0){
            resultBox.innerHTML = stackForNumber.at(-1);
            lastClick = "number";
            currentNumber = '';
            return;
        }

        let num2 = Number(stackForNumber.pop());
        let num1 = Number(stackForNumber.pop());
        let operator = stackForOperator.pop();
        if(operator === "+"){
            stackForNumber.push(''+(num1 + num2));
        }
        else if(operator === "-"){
            stackForNumber.push(''+(num1 - num2));
        }
        else if(operator === "*"){
            stackForNumber.push(''+(num1 * num2));
        }
        else if(operator === "/"){
            if(num2 == 0){
                resultBox.innerHTML = "DIVIDE BY 0 ERROR";
                stackForNumber.splice(0, stackForNumber.length);
                stackForOperator.splice(0, stackForOperator.length);
                currentNumber = '';
                return;
            }
            stackForNumber.push(''+(num1 / num2));
        }
    }
}