var budgetController = (function(){

})();


var UIController = (function(){

    var DOMstrings = {
        inputType : '.add__type',
        inputDecription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn'
    }

    return {
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value, // inc or exp
                desciption : document.querySelector(DOMstrings.inputDecription).value,
                value : document.querySelector(DOMstrings.inputValue).value,
            }
        },
        getDOMstrings : function(){
            return DOMstrings;
        }

    }
})();


var controller = (function(budgetCtrl, UICtrl){
    var setupEventListners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if (event.keyCode == 13 || event.which == 13) {
                ctrlAddItem();
                // console.log("this is workin")
            }
        });
    };
    var ctrlAddItem = function(){
        // some code
        var input = UICtrl.getInput();
    }
    return {
        init : function(){
            // console.log("appliction has started")
            setupEventListners();
        },
    }

    
})(budgetController, UIController);

controller.init();