var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id,
        this.desciption = description,
        this.value = value
    };

    var Income = function(id, description, value){
        this.id = id,
        this.desciption = description,
        this.value = value
    };

    var data = {
        allItem : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    }

    return {
        addItem : function(type, des, val){
            var newItem, ID;
            if (data.allItem[type].length > 0) {
                ID = data.allItem[type][data.allItem[type].length-1].id+1;
            }else{
                ID = 0;
            }

            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            data.allItem[type].push(newItem);
            return newItem;
        },
        testing : function(){
            console.log(data);
        }
    }

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
        // 1. get the input field
        var input = UICtrl.getInput();
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.desciption, input.value);
        budgetCtrl.testing();

        // 
    }
    return {
        init : function(){
            // console.log("appliction has started")
            setupEventListners();
        },
    }

    
})(budgetController, UIController);

controller.init();