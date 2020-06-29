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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItem[type].forEach(function(current){
            sum += current.value;
        })
        data.totals[type] = sum
    };
    var data = {
        allItem : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
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
        deleteItem : function(type, id) {
            var ids, index;
            ids = data.allItem[type].map(function(current){
                return current.id;
            });
            index = ids.indexof(id);
            if (index !== -1) {
                data.allItem[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // calc total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calc the budget : inc - exp
            data.budget = data.totals.inc - data.totals.exp;
            // calc the percentage of income
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
        },
        getBudget : function() {
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            }
        },
        
    }

})();


var UIController = (function(){

    var DOMstrings = {
        inputType : '.add__type',
        inputDecription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container : '.container',
    }

    return {
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value, // inc or exp
                desciption : document.querySelector(DOMstrings.inputDecription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
        },
        addListItem : function(obj, type){
            var html, newHtml, element;
            // create html with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replacr placeholder text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.desciption);
            newHtml = newHtml.replace('%value%', obj.value);
            // insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDecription + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach( function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus(); 
        },
        displayBudget : function(obj) {
            
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
6
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Update budget on UI
        UICtrl.displayBudget(budget);
        
    };
    var ctrlAddItem = function(){
        // some code
        // 1. get the input field
        var input = UICtrl.getInput();
        if ( input.desciption !== "" && !isNaN(input.value) && input.value > 0){

            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.desciption, input.value);
            // 3. Clear the input fields
            UICtrl.clearFields();
            // 4. add newItem to UI
            UIController.addListItem(newItem, input.type);
            // 5. Calc and update budget
            updateBudget();
        }
    }
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // console.log(event.target);
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            console.log(itemID)
            console.log(event.target);
            // 1. Delete item from the data structure
<<<<<<< HEAD
            budgetCtrl.deleteItem(type, ID);
=======
            
>>>>>>> 30b9c9da96f6c9b7094488dab40d7ba271d888b2
            // 2. Delete the item from the UI

            // 3. Update and show the new budget
        }
    };
    return {
        init : function(){
            console.log("appliction has started")
            setupEventListners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        },
    }

    
})(budgetController, UIController);

controller.init();