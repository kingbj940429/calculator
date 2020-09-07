var number = $('.numbers div');
var operator = $('.operators div');
var input = document.getElementById('input');
var resultDisplayed = false;
var note = document.getElementById('note');
var resultString;
//숫자키 클릭시
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", (e) => {
        console.log(e.target.textContent);

        var currentString = input.textContent;
        var lastChar = currentString[currentString.length - 1]; //

        if (resultDisplayed === false) {
            $('#input').append(e.target.textContent); //숫자 입력시 input에 보여줌
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            //equl로 답을 구하고 바로 사칙부호를 넣어서 계속해서 계산할 수 있게 해줌.
            resultDisplayed = false; //equl로 인해 플래그가 true가 되었으니 다 false로 바꿔줌.
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
           
        }
        resultString += e.target.textContent;
       // $('#note').append(e.target.textContent); //메모   
    });
}

//사칙부호 클릭시
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", (e) => {
        console.log(e.target.textContent);
        //$('#input').append(e.target.textContent); //사칙부호 입력시 input에 보여줌
        var currentString = input.textContent;
        var lastChar = currentString[currentString.length - 1];

      
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.textContent;
            //새로 입력되는 사칙연산 전까지의 string에 새롭게 입력되는 문자를 다시 입력한다.
            input.textContent = newString;
           // note.textContent = newString;//메모장도 사칙부호가 바뀌면 내용이 바뀐다.
            
           
        } else if (currentString.length == 0) {
            alert('숫자 먼저 입력해주세요');
        } else {
            input.textContent += e.target.textContent;
           // $('#note').append(e.target.textContent); //메모
        }
    });
}

//= 클릭시
$('#result').on('click', () => {
    var inputString = input.textContent; //입력된 숫자 가져오기
    var numbers = inputString.split(/\+|\-|\×|\÷/g); //정규식 사칙부호 제거
    //+,-,x,÷ 를 정규식으로 찾아서 전역검색을 하여 해당 있는 부분을 다 잘라서 배열에 저장
    var operators = inputString.replace(/[0-9]|\./g, "").split(""); //0~9 과 소수점을 공백으로 하고 분리
    //0~9와 . 을 다 공백으로 replace하고 그걸 다시 한글자씩 split 한다.
    console.log(inputString);
    console.log(numbers);
    console.log(operators);

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }
    //3x3x3x3
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

    $('#note').append(inputString +' = <strong>' + numbers[0] + '</strong><br>');
    if(inputString.length ==0){
        alert('숫자를 입력해주세요');
        //$('#note').text('');
    }
    resultDisplayed = true;
})

//삭제시
$('#remove').on('click', ()=>{
    var currentString = input.textContent;
    console.log('삭제' + currentString);

    currentString=currentString.substring(0,currentString.length-1);
    input.textContent = currentString;
});

//메모 초기화
$('#remove_memo').on('click',()=>{
    $('#note').text('');
});


//clear 클릭시
$('#clear').on('click', () => {
    $('#input').html('');
})