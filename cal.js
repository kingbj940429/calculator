var number = $('.numbers div');
var operator = $('.operators div');
var input = document.getElementById('input');
var resultDisplayed = false;

//숫자키 클릭시
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", (e) => {
        console.log(e.target.textContent);

        $('#note').append(e.target.textContent); //메모


        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            $('#input').append(e.target.textContent); //숫자 입력시 input에 보여줌
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            //equl로 답을 구하고 바로 사칙부호를 넣어서 계속해서 계산할 수 있게 해줌.
            resultDisplayed = false;//equl로 인해 플래그가 true가 되었으니 다 false로 바꿔줌.
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

    });
}

//사칙부호 클릭시
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", (e) => {
        console.log(e.target.textContent);
        //$('#input').append(e.target.textContent); //사칙부호 입력시 input에 보여줌
       
         $('#note').append(e.target.textContent); //메모

       

        input.innerHTML += e.target.innerHTML;
    });
}

//= 클릭시
$('#result').on('click', () => {
    var inputString = input.textContent; //입력된 숫자 가져오기
    var numbers = inputString.split(/\+|\-|\×|\÷/g); //정규식 사칙부호 제거
    var operators = inputString.replace(/[0-9]|\./g, "").split(""); //0~9 과 소수점을 공백으로 하고 분리

    console.log(inputString);
    console.log(numbers);
    console.log(operators);

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    console.log(add);
    while (add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];

    $('#note').append(' = <strong>' + numbers[0]+'</strong><br>'+numbers[0]);
    resultDisplayed = true;
})



//clear 클릭시
$('#clear').on('click', () => {
    $('#input').html('');
    $('#note').html('');
})