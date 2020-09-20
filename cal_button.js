  var KeyEvent =  function(){
    this.inputBtns;
    this.operationBtns;
    this.resultBtn;
    this.clearBtn;
    this.memoClearBtn;
    this.backBtn;

    this.displayPanel;

    this.init = function(){
        this.inputBtns = $('.leftPanel .numbers div').not("#clear");//c제외한 숫자키
        this.operationBtns = $('.operators');//사칙부호
        this.resultBtn = $('#result');//equal 버튼
        this.clearBtn = $('#clear');//클리어 버튼
        this.memoClearBtn = $('#remove_memo');//메모 클리어 버튼
        this.backBtn = $('#remove');// 뒤로가기 버튼

        this.displayPanel = $('#input'); 
        
        this.toKnowKeyCode();
        this.pressNumKey();
    }
    this.toKnowKeyCode = () =>{
        $(document).keydown((e)=>{
            console.log(e.which);//keyCode 알아내기 위함.
        })
    }

    this.pressNumKey = () =>{
        $(document).keydown((e) => {
            var charIndex = 96;//숫자키는 96부터 시작하니깐
            
            var charCode = e.which;

            // backspace
            if ( charCode === 8 ) {
                this.removeEachKey();
            }
            // enter 즉, = 키 눌렀을 때로 간주
            if( charCode === 13){
                this.showResult();
            }
            // 숫자키
            for(i=0;i<10;i++){
                if(charCode === charIndex + i){
                    this.showNumtoDisplay();
                }
            }
          
          });
    }
    this.removeEachKey = () =>{
        this.currentString = this.displayPanel.text();
        
        this.currentString= this.currentString.substring(0,this.currentString.length-1);
        this.displayPanel.text(this.currentString);
    }
    this.showNumtoDisplay = () =>{
        this.displayPanel.append(i);
    }
    this.showResult = () =>{
        this.registResultEvent();
    }

  }

  $(()=>{
      var newKeyEvent = new KeyEvent();
      newKeyEvent.init();
  })