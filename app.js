/*
//Modules to seprate the code of pieces 
//Module Patttern
//IFFI Data privacy, New scope
var budgetController =  (function (){
    var x = 23;
    var add = function (a){
        return x+a;
    }
    
    //This is object budegetController is an object containg publicTest
    //an inner function has an access to varibales and parameter even after the outer function has returned.
    return {
        publicTest: function(b){
            //console.log(add(b));
            return add(b);
        }
    }
})();


var UIController = ( function (){
    //Some Code   
})();

var controller = ( function (budgetCtrl,UICtrl){
    var z = budgetCtrl.publicTest(5);    
    return {
        anotherPublic: function (){
            console.log(z);
        }
    }
})(budgetController,UIController);

*/

//BUDGET CONTROLLER
var budgetController =  (function (){
    //Some Code
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }; 
    
    
    var data = {
        allItems :{
            exp:[],
            inc:[]
        },      
        totals:{
        exp : 0,
        inc : 0
        }
    };
    
    return {
        addItem: function(type,desc,val){
        var newItem,ID;  
        //[1 2 3 4 5],next ID = 6
        //[1 2 4 6 8],next ID = 9   
        //We want ID to be equal to LastId + 1;
        //created new ID
        if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length-1].id+1;    
        }else{
            ID=0;     
        }
            
        
        
        //Createe new Item based on exp or inc
        if(type ==='exp'){
            newItem = new Expense(ID,desc,val);    
        } else if(type==='inc') {
            newItem = new Income(ID,desc,val);    
        }
        
        //push it into our data structure
        data.allItems[type].push(newItem);
            
        //return the new item
        return newItem;    
    },
        testing: function(){
            console.log(data);
        }
};
    
})();





//UI CONTROLLER
var UIController = ( function (){
    var DOMstrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn :'.add__btn',
        incomeContainer : '.income__list',
        expensesContainer :'.expenses__list'
    }
    return {
        getinput : function(){
            return {
            type: document.querySelector(DOMstrings.inputType).value,//We will get either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value : document.querySelector(DOMstrings.inputValue).value  
            };
            
        }, 
        addListItem : function(obj,type){
            //create HTML String with placeholder tag
            var html,newHtml,element;
            if(type==='inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';    
            } else if(type==='exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>'    
            }
            
            //Replace placeholder tag with some actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            
            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
        },
            clearFields : function(){
                var fields,fieldsArr;
                //It does not returns similar but not different
                //It returns list but not array
                //Thats why we have to list into array
                fields = document.querySelectorAll(DOMstrings.inputDescription+', '+DOMstrings.inputValue);
                
                //Trick is to use slice method it retunrs copy of an array but an array
               
                fieldsArr = Array.prototype.slice.call(fields);
                fieldsArr.forEach(function(current,index,array){
                    current.value="";
                    
                });
                fieldsArr[0].focus();
                
            },
            getDOMstring :function(){
                return DOMstrings;
            }
    };
    
})();


//GLOBAL APP CONTROLLER
var controller = ( function (budgetCtrl,UICtrl){
   //Some Code
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstring();
 document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    
    document.addEventListener('keypress',function(event){
        
        if(event.keyCode===13 || event.which===13)
            {
                ctrlAddItem();
            }
    });
};
        
    
    var ctrlAddItem = function(){
    var input,newItem;
        //TODO LIST
    //1. Get the field input data');
    
    input = UICtrl.getinput();
    console.log(input);
    //2. Add the item to budget controller
    newItem = budgetCtrl.addItem(input.type,input.description,input.value)
        
    //3. Add the item to the UI
    UICtrl.addListItem(newItem,input.type);     
    //4. Clear the fields
    UICtrl.clearFields();
        
    //4. Calculate the budget
        
    //5. Display the budget
    
    console.log('It works fine');
        
    };
    
    return {
        init : function(){
            console.log('Application has started');
            setupEventListeners();
        }
    };
    
})(budgetController,UIController);

controller.init();






















































