var Calculator = function () {

    this.inputBtns;
    this.operationBtns;
    this.resultBtn;
    this.clearBtn;
    this.memoClearBtn;
    this.backBtn;

    this.displayPanel;
    this.memoPanel;

    this.currentString;
    this.calculateHistory = []; // 결과값을 배열로 하나씩 넣는다.
    this.lastChar;
    this.resultDisplayed = false;

    this.init = function () {
        this.inputBtns = $('.leftPanel .numbers div').not("#clear"); //c제외한 숫자키
        this.operationBtns = $('.operators'); //사칙부호
        this.resultBtn = $('#result'); //equal 버튼
        this.clearBtn = $('#clear'); //클리어 버튼
        this.memoClearBtn = $('#remove_memo'); //메모 클리어 버튼
        this.backBtn = $('#remove'); // 뒤로가기 버튼

        this.displayPanel = $('#input');
        this.memoPanel = $('#note');

        //마우스 이벤트 관련 함수
        this.showClickNumbers(); //마우스로 숫자 눌렀을 때
        this.showClickOperators(); //마우스로 사칙부호 눌렀을 때
        this.showClickReult(); //마우스로 = 클릭 했을 때 이벤트
        this.registRemoveEachEvent(); // Backspace 눌렀을 때
        this.clearDisplayPanel(); //Clear 눌렀을 떄
        this.removeEvent(); //메모 Clear 눌렀을 때

        //키 이벤트 관련 함수
        this.toKnowKeyCode(); //키 코드를 보기 위한 함수
        this.pressNumKey(); //키로 숫자 눌렀을 때
        this.pressOpeKey(); //키로 사칙부호 눌렀을 때
        this.pressRestKey(); //키로 enter, backspace 눌렀을 때

    }
    //마우스 이벤트 관련
    this.showClickNumbers = () => {
        $('.leftPanel .numbers div').not("#clear").each((index) => {
            this.inputBtns[index].addEventListener("click", (e) => {
                this.registNumberEvent(e);
            });
        });
    }

    this.showClickOperators = () => {
        $('.operators').each((index) => {
            this.operationBtns[index].addEventListener("click", (e) => {
                this.registOperatorEvent(e);
            });
        });
    }

    this.showClickReult = () => {
        this.resultBtn.on("click", () => {
            this.registResultEvent();
        });
    }

    this.registRemoveEachEvent = () => {
        $('#remove').on('click', () => {
            this.removeEach();
        });

    }

    this.clearDisplayPanel = () => {
        $('#clear').on('click', () => {
            this.clearPanel();
        })
    }

    this.removeEvent = () => {
        $("#remove_memo").on("click", () => {
            this.destroy();
        });
    }
    //키 이벤트 관련
    this.toKnowKeyCode = () => {
        $(document).keydown((e) => {
            console.log(e.which); //keyCode 알아내기 위함.
        })
    }

    this.pressNumKey = () => {
        $(document).keydown((e) => {
            this.pressNumKeyFunc(e);
        });
    }

    this.pressOpeKey = () => {
        this.isShift;
        this.pressOpeKey();
    }

    this.pressRestKey = () => {
        $(document).keydown((e) => {
            this.pressRestKeyFunc(e);
        });
    }

    //마우스 이벤트 관련 함수들
    this.registNumberEvent = (e) => {
        this.currentString = this.displayPanel.text();
        this.lastChar = this.currentString[this.currentString.length - 1];
        if (this.resultDisplayed === false) {
            this.insertValueToDisplay(e);
        } else if (this.resultDisplayed === true && this.lastChar === "+" || this.lastChar === "-" || this.lastChar === "×" || this.lastChar === "÷") {
            this.calculateValueRightAway(e);
        } else {
            this.afterOneCalculatrion(e);
        }
    }
    this.insertValueToDisplay = (e) => {
        this.displayPanel.append(e.target.textContent);
    }
    this.calculateValueRightAway = (e) => {
        this.resultDisplayed = false;
        this.displayPanel.append(e.target.textContent);
    }
    this.afterOneCalculatrion = (e) => {
        this.resultDisplayed = false;
        this.displayPanel.text("");
        this.displayPanel.append(e.target.textContent);
    }
    //사칙 부호 입력했을 때
    this.registOperatorEvent = (e) => {
        try {
            this.currentString = this.displayPanel.text();
            this.lastChar = this.currentString[this.currentString.length - 1];

            if (this.lastChar === "+" || this.lastChar === "-" || this.lastChar === "×" || this.lastChar === "÷") {
                this.ifOperatorChanged(e);
            } else if (this.currentString.length == 0) {
                this.inputNumberBeforeOperator();
            } else {
                this.doInputOperator(e);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //만약 사칙부호를 클릭하고 이어서 사칙부호 클릭시
    this.ifOperatorChanged = (e) => {
        var newString = this.currentString.substring(0, this.currentString.length - 1) + e.target.textContent;

        console.log('newString : ' + newString);
        this.displayPanel.text(newString);
    }
    //숫자 입력 없이 바로 사칙부호 눌렀을때
    this.inputNumberBeforeOperator = () => {
        alert('숫자 먼저 입력해주세요');
    }
    this.doInputOperator = (e) => {
        this.displayPanel.append(e.target.textContent);
    }
    this.doInputKeyOperator = (char) => {
        this.displayPanel.append(char);
    }
    // = 를 직접 누르거나 key 이벤트로 엔터를 눌렀을때 실행되는 함수
    this.registResultEvent = (e) => {
        var inputString = this.displayPanel.text(); //입력된 숫자 가져오기
        var numbers = inputString.split(/\+|\-|\×|\÷/g); //정규식 사칙부호 제거
        var operators = inputString.replace(/[0-9]|\./g, "").split(""); //0~9 과 소수점을 공백으로 하고 분리

        console.log('inputString : ', inputString);
        console.log('numbers : ', numbers);
        console.log('operators : ', operators);


        this.divide(numbers, operators);
        this.multiply(numbers, operators);
        this.subtract(numbers, operators);
        this.add(numbers, operators);

        this.displayPanel.text(numbers[0]);
        this.resultDisplayed = true;

        this.addHistory(numbers, operators, numbers[0], inputString);
    }


    //키 이벤트 관련 함수들
    this.pressRestKeyFunc = (e) => {
        var charCode = e.which;

        // backspace
        if (charCode === 8) {
            this.removeEachKey();
        }
        // enter 즉, = 키 눌렀을 때로 간주
        if (charCode === 13) {
            this.showResult(); //키보드로 엔터 눌렀을 때
        }
    }
    this.removeEachKey = () => {
        this.currentString = this.displayPanel.text();

        this.currentString = this.currentString.substring(0, this.currentString.length - 1);
        this.displayPanel.text(this.currentString);
    }
    this.showNumtoDisplay = (e) => {
        this.displayPanel.append(i);
    }
    this.showResult = () => {
        this.registResultEvent();
    }
    this.pressOpeKey = () => {
        $(document).keyup((e) => {
            if (e.which === 16) {
                this.isShift = false;
                console.log(this.isShift);
            }
        })
        $(document).keydown((e) => {
            var charCode = e.which;

            this.currentString = this.displayPanel.text();
            this.lastChar = this.currentString[this.currentString.length - 1];

            if (charCode === 16) {
                this.isShift = true;
                console.log(this.isShift);
            }

            //사칙부호
            if (charCode === 191 || charCode === 111) {
                this.KeyOperatorChanged('÷');
            } else if (charCode === 106) {
                this.KeyOperatorChanged('×');
            } else if ((charCode === 187 && e.shiftKey) || charCode === 107) {
                this.KeyOperatorChanged('+');
            } else if (charCode === 189 || charCode === 109) {
                this.KeyOperatorChanged('-');
            }

        });
    }
    this.KeyOperatorChanged = (char) => {
        if (this.lastChar === "+" || this.lastChar === "-" || this.lastChar === "×" || this.lastChar === "÷") {
            this.KeyOperatorChangedFunc(char);
        } else if (this.currentString.length == 0) {
            this.inputNumberBeforeOperator();
        } else {
            this.doInputKeyOperator(char);
        }
    }
    this.KeyOperatorChangedFunc = (char) =>{
        console.log("LastChar : " + this.lastChar);
        var newString = this.currentString.substring(0, this.currentString.length - 1) + char;
        //새로 입력되는 사칙연산 전까지의 string에 새롭게 입력되는 문자를 다시 입력한다.
        console.log('newString : ' + newString);
        this.displayPanel.text(newString);
    }
    this.pressRestKeyFunc = (e) => {
        var charCode = e.which;

        // backspace
        if (charCode === 8) {
            this.removeEachKey();
        }
        // enter 즉, = 키 눌렀을 때로 간주
        if (charCode === 13) {
            this.showResult(); //키보드로 엔터 눌렀을 때
        }
    }
    this.toKnowKeyCode = () => {
        $(document).keydown((e) => {
            console.log(e.which); //keyCode 알아내기 위함.
        })
    }

    this.pressNumKey = () => {
        $(document).keydown((e) => {
            var charIndex = 96;
            var charIndex02 = 48;
            var charCode = e.which;

            // 숫자키
            for (i = 0; i < 10; i++) {
                if (charCode === charIndex + i || charCode === charIndex02 + i) {
                        this.showNumtoDisplay(e);
                }
            }
        });
    }

    this.pressNumKeyFunc = (e) => {
        var charIndex = 96;
        var charIndex02 = 48;
        var charCode = e.which;

        // 숫자키
        for (i = 0; i < 10; i++) {
            if (charCode === charIndex + i || charCode === charIndex02 + i) {
                if (charCode === 56 || this.isShift === true) {

                } else {
                    this.showNumtoDisplay(e);
                }
            }
        }
    }
    this.removeEach = () => {
        var currentString = this.displayPanel.text();

        currentString = currentString.substring(0, currentString.length - 1);
        this.displayPanel.text(currentString);
    }

    this.clearPanel = () => {
        this.displayPanel.empty();
    }

    this.addHistory = function (numbers, operators, result, inputString) {
        var historyObj = new CalculatorHistory(
            numbers, operators, result, inputString
        );
        console.log("historyObj : ", historyObj.inputString);

        this.calculateHistory.push(historyObj);
        this.memoPanel.append(historyObj.toString() + "<br>");
    }
    this.removeEvent = () => {
        $("#remove_memo").on("click", () => {
            this.destroy();
        });
    }
    this.destroy = () => {
        var i, len = this.calculateHistory.length;
        this.calculateHistory.length = 0;
        $("#note").text("");
    }


    //사칙 연산 계산해주는 함수들
    this.divide = (numbers, operators) => {
        var divide = operators.indexOf("÷");
        while (divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }
    }
    this.multiply = (numbers, operators) => {
        var multiply = operators.indexOf("×");
        while (multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }
    }
    this.subtract = (numbers, operators) => {
        var subtract = operators.indexOf("-");
        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }
    }
    this.add = (numbers, operators) => {
        var add = operators.indexOf("+");
        console.log(add);
        while (add != -1) {
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }
    }
}
var CalculatorHistory = function (numbers, operators, result, inputString) {
    this.numbers = numbers; //왜 값들이 제대로 넘어오지 않는걸까..??
    this.operators = operators;
    this.result = result;
    this.inputString = inputString;
    this.resultString = "";

    this.toString = () => {
        if (this.resultString === "") {
            var str = "";
            str += this.inputString;
            str += " = " + this.result;
            this.resultString = str;
        }
        return this.resultString;
    }
}

$(() => {
    var newCalculator = new Calculator();
    newCalculator.init();
})