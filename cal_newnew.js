var Calculator = function(){

    this.inputBtns;
    this.operationBtns;
    this.resultBtn;
    this.clearBtn;
    this.memoClearBtn;
    this.backBtn;

    this.displayPanel;
    this.memoPanel;

    this.currentString;
    this.calculateHistory = [];// 결과값을 배열로 하나씩 넣는다.
    this.lastChar;
    this.resultDisplayed = false;

    this.init = function(){
        this.inputBtns = $('.leftPanel .numbers div').not("#clear");//c제외한 숫자키
        this.operationBtns = $('.operators');//사칙부호
        this.resultBtn = $('#result');//equal 버튼
        this.clearBtn = $('#clear');//클리어 버튼
        this.memoClearBtn = $('#remove_memo');//메모 클리어 버튼
        this.backBtn = $('#remove');// 뒤로가기 버튼

        this.displayPanel = $('#input');
        this.memoPanel = $('#note');
        
        this.registNumberEvent();//숫자 눌렀을 때
        this.registOperatorEvent();//사칙부호 눌렀을 때
        this.registResultEvent();//equal 눌렀을 때
        this.registRemoveEachEvent();// Backspace 눌렀을 때
        this.clearDisplayPanel();//Clear 눌렀을 떄
        
    }

    //숫자키 입력했을 때
    this.registNumberEvent = () => {
            $('.leftPanel .numbers div').not("#clear").each((index)=>{
                this.inputBtns[index].addEventListener("click", (e) => {
                    this.currentString = this.displayPanel.text();
                    this.lastChar = this.currentString[this.currentString.length - 1];
                    if (this.resultDisplayed === false) {
                        this.insertValueToDisplay(e);
                    } else if (this.resultDisplayed === true && this.lastChar === "+" || this.lastChar === "-" || this.lastChar === "×" || this.lastChar === "÷") {
                        //equl로 답을 구하고 바로 사칙부호를 넣어서 계속해서 계산할 수 있게 해줌.
                        this.calculateValueRightAway(e);
                    } else {
                        this.afterOneCalculatrion(e);
                    }
                });
            });
    }
    //숫자를 화면에 나타내기 위한 함수
    this.insertValueToDisplay = (e) => {
       this.displayPanel.append(e.target.textContent); //숫자 입력시 input에 보여줌
    }
    //계산 값에 바로 이어서 부호 대입이 가능케 하는 함수
    this.calculateValueRightAway = (e) => {
        this.resultDisplayed = false;
        this.displayPanel.append(e.target.textContent);
    }
    //한번의 계산 이후 그 다음을 위한 함수
    this.afterOneCalculatrion = (e) =>{
        this.resultDisplayed = false;
        this.displayPanel.text("");
        this.displayPanel.append(e.target.textContent);
    }
    //사칙 부호 입력했을 때
    this.registOperatorEvent = () => {
        $('.operators').each((index)=>{
           this.operationBtns[index].addEventListener("click", (e) => {
                this.currentString = this.displayPanel.text();
                this.lastChar = this.currentString[this.currentString.length - 1];
        
                if (this.lastChar === "+" || this.lastChar === "-" || this.lastChar === "×" || this.lastChar === "÷") {
                    this.ifOperatorChanged(e);
                } else if (this.currentString.length == 0) {
                    this.inputNumberBeforeOperator();
                } else {
                    input.textContent += e.target.textContent;//여기 함수화 시켜야함
                }
            });
        });
    }
    //만약 사칙부호를 클릭하고 이어서 사칙부호 클릭시 (여기 버그 있음)
    this.ifOperatorChanged = (e) => {
        var newString = this.currentString.substring(0, this.currentString.length - 1) + e.target.textContent;
        //새로 입력되는 사칙연산 전까지의 string에 새롭게 입력되는 문자를 다시 입력한다.
        console.log('newString : ' + newString);
        this.displayPanel.text(newString);
    }
    //숫자 입력 없이 바로 사칙부호 눌렀을때
    this.inputNumberBeforeOperator = ()=>{
        alert('숫자 먼저 입력해주세요');
    }
    //= 눌렀을 때
    this.registResultEvent = (e)=>{
        this.resultBtn.on('click', () => {
            var inputString = this.displayPanel.text(); //입력된 숫자 가져오기
            var numbers = inputString.split(/\+|\-|\×|\÷/g); //정규식 사칙부호 제거
            //+,-,x,÷ 를 정규식으로 찾아서 전역검색을 하여 해당 있는 부분을 다 잘라서 배열에 저장
            var operators = inputString.replace(/[0-9]|\./g, "").split(""); //0~9 과 소수점을 공백으로 하고 분리
            //0~9와 . 을 다 공백으로 replace하고 그걸 다시 한글자씩 split 한다.
        
            console.log('inputString : ' , inputString);
            console.log('numbers : ' , numbers);
            console.log('operators : ' , operators);
           
          
            this.divide(numbers, operators);
            this.multiply(numbers, operators);
            this.subtract(numbers, operators);
            this.add(numbers, operators);
           
            this.displayPanel.text(numbers[0]);
            this.calculateHistory.push(numbers[0]);//결과값을 하나씩 넣는다.
            console.log("결과값 히스토리 : ",this.calculateHistory);
            this.resultDisplayed = true;
            //결과값을 메모 에 넘겨주는 곳 숫자들 사칙부호들 결과값이 arguments
            this.addHistory(numbers, operators, numbers[0], inputString);
        })
    }
    this.divide = (numbers, operators) =>{
        var divide = operators.indexOf("÷");
        while (divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }
    }
    this.multiply = (numbers, operators) =>{
        var multiply = operators.indexOf("×");
        while (multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }
    }
    this.subtract = (numbers, operators) =>{
        var subtract = operators.indexOf("-");
        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }
    }
    this.add = (numbers, operators) =>{
        var add = operators.indexOf("+");
        console.log(add);
        while (add != -1) {
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }
    }
    //백스페이스 눌렀을때
    this.registRemoveEachEvent = ()=>{
        $('#remove').on('click', ()=>{
            this.removeEach();
        });
        
    }
    this.removeEach = () => {
        var currentString = this.displayPanel.text();
        
        currentString=currentString.substring(0,currentString.length-1);
        this.displayPanel.text(currentString);
    }
    //클리어 버튼 눌렀을때
    this.clearDisplayPanel = ()=>{
        $('#clear').on('click', () => {
           this.clearPanel();
        })
    }
    this.clearPanel = () =>{
        this.displayPanel.empty();
        this.calculateHistory.length = 0;
    }
    
    this.addHistory = function( numbers, operators, result, inputString ){
        var historyObj = new CalculatorHistory(
            numbers, operators, result, inputString
        );
        console.log("historyObj : ", historyObj.inputString);

        this.memoPanel.append( historyObj.toString() +"<br>" );
        historyObj.removeEvent();
    }

    
}
var CalculatorHistory = function(numbers, operators, result, inputString){
    this.numbers = numbers;//왜 값들이 제대로 넘어오지 않는걸까..??
    this.operators = operators;
    this.result = result;
    this.inputString = inputString;
    this.resultString = "";

    this.toString = () => {
        if(this.resultString === ""){
            var str = "";
            str += this.inputString;
            str += " = " + this.result;
            this.resultString = str;
        }
        return this.resultString;
    }

    this.removeEvent = () =>{
        $("#remove_memo").on("click",()=>{
            this.destroy();
        });
    }

    this.destroy = ()=>{
        $("#note").text("");
        
    }

}

$(()=>{
    var newCalculator = new Calculator();
    newCalculator.init();
})