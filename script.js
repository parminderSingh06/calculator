let first_num = "";
let operator = undefined;
let second_num = "";
let firstNegative = false;
let secondNegative = false;
let n_status = 'off';
const screen = document.querySelector('#display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const negative = document.querySelector('#negative');

negative.addEventListener('click', function(){
    numtype();
})
equals.addEventListener('click',function(){
    operate(operator,first_num,second_num);
});

clear.addEventListener('click',function(){
    clearAll();
})

for(let i=0;i<numbers.length;i++)
{
    numbers[i].addEventListener('click',function(){
        if(operator == undefined)
        {
            display_first(numbers[i].value);
        }
        else
            display_second(numbers[i].value);
    });
}

for(let i=0;i<operators.length;i++)
{
    operators[i].addEventListener('click',function(){
        setOperator(operators[i].value);
    })
}

function clearAll()
{
    first_num = "";
    second_num = "";
    operator = undefined;
    screen.textContent = "0";
    let firstNegative = false;
    let secondNegative = false;
    let n_status = 'off';
    for(let i=0;i<operators.length;i++)
    {
        operators[i].setAttribute('style','background-color:black');
    }
}

function bgColorAdjust(operator)
{
    for(let i=0;i<operators.length;i++)
    {
        if(operators[i].value == operator)
        {
            operators[i].setAttribute('style','background-color:orange');
        }
        else
        operators[i].setAttribute('style','background-color:black');
    }
}

function setNegative(status)
{
    n_status = status;
}

function numtype()
{
    if(n_status=='off')
    {
        setNegative('on');
        screen.textContent = "-" + screen.textContent;
        if(operator == undefined)
        {
            firstNegative = true;
        }
        if(operator != undefined)
        {
            secondNegative = true;
        }
        return;
    }
    if(n_status=='on')
    {
        setNegative('off');
        screen.textContent = screen.textContent.replace('-','');
        if(operator == undefined)
        {
            firstNegative = false;
        }
        if(operator != undefined)
        {
            secondNegative = false;
        }
        return;
    }

}

function setOperator(user_input)
{
    if(first_num == "")
    {
        return;
    }
    if(second_num != "")
    {
        first_num = operate(operator,first_num,second_num);
        second_num = "";
    }
    operator = user_input;
    bgColorAdjust(operator);
}

function display_first(user_input)
{
    first_num += user_input;
    screen.textContent = first_num;
    if(n_status == 'on')
    {
        screen.textContent = "-" + first_num;
    }
}

function display_second(user_input)
{
    second_num += user_input;
    screen.textContent = second_num;
}

function display_result(num)
{
    screen.textContent = num;
    first_num = num;
    second_num = "";
}

function add(a,b)
{
    display_result(a + b);
    return a + b;
}

function subtract(a,b)
{
    display_result(a - b);
    return a - b;
}

function multiply(a,b)
{
    display_result(a * b);
    return a * b;
}

function divide(a,b)
{
    if(b == 0)
    {
        clearAll();
        return;
    }
    display_result(a / b);
    return a / b;
}

function mod(a,b)
{
    display_result(a % b);
    return a % b;
}

function operate(operator,a,b)
{
    let ans = 0;
    a = Number(a);
    b = Number(b);
    
    if(firstNegative == true)
    {
        a = a * -1;
        console.log(a);
    }
    if(secondNegative == true)
    {
        b = b * -1;
    }
    console.log("First:" + first_num + " Operator:" + operator + " Second:" + second_num);
    if(operator == "+")
    {
        ans = add(a,b);
    }
    else if(operator == "-")
    {
        ans = subtract(a,b);
    }
    else if(operator == "x")
    {
        ans = multiply(a,b);
    }
    else if(operator == "÷")
    {
        ans = divide(a,b);
    }
    else if(operator == "%")
    {
        ans = mod(a,b);
    }
    firstNegative = false;
    secondNegative = false;
    for(let i=0;i<operators.length;i++)
    {
        operators[i].setAttribute('style','background-color:black');
    }
    n_status = 'off';
    return ans;
}