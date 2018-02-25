# js-calculator

feature waiting list:
- handle 0
- handle .
- handle CE
- protect all parameters
- add keyboard num input
- add negtive num calc

### 20 Feb
- Build html page.

### 21 Feb
- Add event listener. Print button innerHTML when clicked.
- Using ```.bind``` to on hold callback function.

### 22 Feb
- Mind map:
<img src="mind_map.JPG" alt="Image of Prototype_chain">


- Add ```printNum``` and ```printOperator``` function.
- Find a way to convert expression string into array

```
11+11*11/11 => [11, +, 11, *, 11, /, 11] 
```
- Add ```highPriorityOperatorIndex``` to check the index of first ```*``` or ```/``` if have.

### 23 Feb
- Add ```calcResults``` to handle the expression array and print result.

### 24 Feb
- Print the expression and result on page by click buttons.
- Add function to handle AC button.
- Fix bug when convert expression string to array.
- Add function if click number after click enter refresh the expression print.

### 25 Feb
New IDEA 
    expressionStr = "";
    lastWord = expressionStr[expressionStr.length - 1];
    expressionArr = [];
- When click Num:
    check if it's dot. 
    expressionStr += num;
    lastWord = expressionStr[expressionStr.length - 1];

- When click operator:
    check if lastWord match operator 
        if not, push str into expressionArr. 
                push operator into expressionArr.
                empty expressionStr.
                lastWord = operator

