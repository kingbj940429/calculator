/**
 * Created by P on 2020-09-09.
 */

var CalculatorHistory = function(values, operators, result){

    this.inputValues = values;
    this.operators = operators;
    this.result = result;
    this.resultString = "";

    this.element = null;

    this.registEvent = function(){
    }

    this.removeEvent = function () {
        
    }


    this.toString = function(){

        if( this.resultString === "" ){
            var str = "";
            var i, len = this.inputValues.length-1;
            for( i=0; i<len; i++ ){
                str += this.inputValues[i];
                str += " " + this.operators[i];
            }

            str += " = " + this.result;
            this.resultString = str;
        }

        return this.resultString;
    }

    this.destroy = function(){
        this.removeEvent();

    }


}


var Calculator = function(){

    // view sync
    this.operationBtns;
    this.inputBtns;
    this.resultBtn;
    this.backBtn;
    this.memoClearBtn;

    this.memoPanel;
    this.displayPanel;


    // properties
    this.currentInputValues = [];
    this.calculateHistory = [];


    this.init = function(){

        this.displayPanel = $("#input");
        this.memoPanel = $("#note");

        this.inputBtns = $(".leftPanel .numbers div").not("#clear");


        this.registEvent();

    }

    this.registEvent = function(){

        this.inputBtns.on( "click", function(e){
            e.preventDefault();


        })
    }

    this.insertValueToDisplay = function( value ){
        this.currentInputValues.push( value );
        this.displayPanel.append( " " + value );
    }

    this.clearDisplayPanel = function(){
        this.displayPanel.empty();
        this.currentInputValues.length = 0;
    }

    this.clearMemoPanel = function(){


        var i, len = this.calculateHistory.length;
        for( i=0; i<len; i++ ){
            this.calculateHistory[i].destroy();
        }

        this.calculateHistory.length = 0;

    }

    this.addHistory = function( values, operators, result ){
        var historyObj = new CalculatorHistory(
            values, operators, result
        );
        this.calculateHistory.push( historyObj );

        this.memoPanel.append( historyObj.toString() );
    }

}


$(function(){
    var newCalculator = new Calculator();
    newCalculator.init();
})