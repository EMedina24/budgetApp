


// //////////budget controller module //////////////////////////////////

var budgetController = (function(){


 var Expense = function(id,description, value){
     this.id = id;
     this.description = description;
     this.value = value; 
 };

var Income = function (id, description, value){
    this.id = id;
    this.description = description;
    this.value = value; 
};



var data = {

    allItems:{
        exp:[],
        inc:[],   },

    totals: {
        exp:0,
        inc:0,     }   
    
    };

    return {
     addItem: function(type, des, val){

         var newItem;
         // create new item ID
         if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length - 1] .id + 1 ;
         }else {
             ID = 0;
         }
         


       // ceate new item
      if(type === 'exp'){

      newItem = new Expense (ID,des, val);

                
    }   else if (type === 'inc'){
         newItem = new Income (ID,des, val);
                         
                   }
      data.allItems [type].push(newItem);
      return newItem;
     },


     testing:function(){
         console.log(data);
     }


       };
     }) ();
// ////////// END budget controller module //////////////////////////////////



/////////////////// UI controller /////////////////////////////////////

var uiController = (function() {

var DOMstrings = {
inputType : '.add__type', 
inputDescription: '.add__description',
inputValue: '.add__value',
inputBtn: '.add__btn',
incomeContainer: '.income__list',
expensesContainer: '.expenses__list',

                     }




    return {
        getInput: function(){
           

            return{
                 type: document.querySelector(DOMstrings.inputType).value, // will either be 'inc' for income or 'exp' for expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                 value: document.querySelector(DOMstrings.inputValue).value,

                                                         };

                                            },

           addlistItem: function(obj,type){
            var html, newHtml, element;
           // html string
           
            if( type === 'inc'){
            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
               } else if ( type === 'exp') {
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
               }


           //replace placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%value%', obj.value);
            newHtml = newHtml.replace('%description%', obj.description);

           // insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

           },
        clearFields: function(){
            var fields, fieldsArr;
         fields =  document.querySelectorAll(DOMstrings.inputDescription + ','+ DOMstrings.inputValue);
          var fieldsArr = Array.prototype.slice.call(fields);
          fieldsArr.forEach(function(current, index, array){
           current.value ="";
          });

         fieldsArr[0].focus();

        },

           getDOMstrings: function(){
               return DOMstrings;
                               }

    
         };

   }) ();
/////////////////// END  UI controller /////////////////////////////////////



// /////////////// GLobal app controller////////////////////////////////////

var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn) .addEventListener('click', ctrlAddItem);
      document.addEventListener('keypress', function(e){

                      if (e.keycode === 13 || e.which === 13 ){
                             ctrlAddItem(); 
                            
                      }
                          });



        
    };


  

           var ctrlAddItem = function(){
   var input, newItem;
   // 1. get filed input data
    input = UICtrl.getInput();

   console.log(input);



    // 2. add the item to the budget controller
     newItem =  budgetCtrl.addItem(input.type, input.description, input.value);
     // 3. add item to UIs
     UICtrl.addlistItem(newItem, input.type);
     // 4. calculate the budget
     UICtrl.clearFields();

     // 5. display the budget on the ui




             
                                   };

                                       return {
                                              init:function (){
                                             console.log('Application has started');
                                             setupEventListeners();
                                                 }
                                             };

          }) (budgetController,uiController);        // end of controller

// ///////////////END Global app controller////////////////////////////////////

controller.init();