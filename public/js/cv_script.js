'use strict';

var orderDrinksArray = [];





/*var startPage = new Vue({
    el: '#start',
    data: {
        seen: true
    }
})

var sizePage = new Vue({
    el: '#size',
    data: {
        seen: false
    }
})

var topbar = new Vue({
    el: '#topbar',
    data: {
        seen: false
    }
})

var smoothieIngredientsPage = new Vue({
  el: '#smoothieIngredients',
  data: {
    seen: false
  }
})

var juiceIngredientsPage = new Vue({
  el: '#juiceIngredients',
  data: {
    seen: false
  }
})

var ingredientsPage = new Vue({
  el: '#ingredPage',
  data: {
    seen: false
  }
})

var cartPage = new Vue({
  el: '#cart',
  data: {
    seen: false
  }
})*/



/*function typeItem(type) {
    this.drink.type = type;
    orderDrinksArray.push(drink);
    console.log(drink.type + " new drink type");
    console.log(orderDrinksArray[0].type + " content array");
    all_cv.showStartPage = false;
    console.log(all_cv.showStartPage);
    all_cv.showTopbar = false;
    all_cv.showSizePage = true;
}

function sizeItem(size) {
    this.drink.size = size;
    console.log(drink.size + " new size");
    console.log(drink.type + " current drink type");
    console.log(orderDrinksArray[0].type + " " + orderDrinksArray[0].size + " content array");
    sizePage.seen = false;
    topbar.seen = true;
    if (drink.type === "smoothie"){
        smoothieIngredientsPage.seen = true;
    } else {
        juiceIngredientsPage.seen = true;
    }
}

function ingredBase() {
    closeAllIngred();
    var x = document.getElementById("ingredBase");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function ingredCat() {
    closeAllIngred();
    var x = document.getElementById("ingredCat");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function closeAllIngred() {
    var iB = document.getElementById("ingredBase");
    var iC = document.getElementById("ingredCat");
    iB.style.display = "none";
    iC.style.display = "none";
}

function sendToCart() {
    this.drink.inCart = true;
    ingredientsPage.seen = false;
    cartPage.seen = true;
    console.log(orderDrinksArray[0].type + " " + orderDrinksArray[0].size + " " + orderDrinksArray[0].inCart + " content array");
}

console.log(drink.type + " innan");
console.log(drink.size + " innan");



/*ordering.js
------------------------------*/

/*jslint es5:true, indent: 2 */
/*global sharedVueStuff, Vue, socket */




var drink = {
    type : "none", 
    size : "0", 
    ingredBase : "none",
    inCart : false,
};



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}



function getOrderNumber() {
    // It's probably not a good idea to generate a random order number, client-side. 
    // A better idea would be to let the server decide.
    return "#" + getRandomInt(1, 1000000);
}


// Start Vue:
Vue.component('ingredient', {
    props: ['item', 'lang'],
    template: ' <button class="ingredient" v-on:click="addIngredientToDrink"> {{item["ingredient_"+ lang]}} </button>',
    methods: {
        addIngredientToDrink: function () {
            this.$emit('add-ingredient');
        },
    }
});


var vm = new Vue({
    el: '#all_cv',
    mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
    data: {
        type: '',
        chosenIngredients: [],
        volume: 0,
        price: 0,

        showStartPage: true,
        showHelpLangContainer: true,
        showTopBar: true,
        showHelpAbortContainer: false,
        showTopBarButton: false,
        showSizePage: false,
        showIngredPage: false,
        showJuiceMug: false,
        showSmoothieMug: false,
        showButtonBox: false,
        showCatButtons: false,
        showIngredientsButtons: false,
        showCartPage: false,
        showFooter: true,
        chosenCatName: '',
        searchTerm: ''

    },


    methods: {
        hideAllTabs: function () {
            this.showStartPage = false;
            this.showHelpLangContainer = false;
            this.showHelpAbortContainer =false;
            this.showTopBarButton = false;
            this.showSizePage = false;
            this.showIngredPage = false;
            this.showJuiceMug = false;
            this.showSmoothieMug = false;
            this.showIngredientsButtons = false;
            this.showCartPage = false;
            this.showFooter = true;
        },
        
    //The function that is activated when "cart" is pressed    
        

        filtered_ingredients: function(cat) {
            return this.ingredients.filter(function(item) {
                if(cat ===''){
                    return item }
                else {
                    return item["ingredient_cat"] === cat;
                }
            })
        },
        
        searched_ingredients: function(ingred){
                if(this.searchTerm === ''){
                    return ingred }
                else if( ingred['ingredient_'+ this.lang].indexOf(this.searchTerm) !==-1){
                    return ingred;
                
                }
            }, 
        
        showAllIngredients: function(){
            this.chosenCatName='';
        },
        


        doShowIngredientsButtons: function(catName){
            this.chosenCatName = catName;
            this.showCatButtons = false;
            this.showIngredientsButtons = true;
        },

        choosePreMadeDrinks: function(){

        },


        showTab: function (tab) {
            console.log(tab)
            this.hideAllTabs();
            if (tab === "sizePage") {
                this.showSizePage = true;
                this.showHelpAbortContainer = true;
            }
            else if (tab === "abortOrder") {
                this.showStartPage = true;
                this.showHelpLangContainer = true;
            }
            else if (tab === "ingredPage") {
                if (drink.type == "smoothie") {
                    this.showSmoothieMug = true;
                }
                else if (drink.type == "juice") {
                    this.showJuiceMug = true;
                }
                this.showIngredPage = true;
                this.showTopBarButton = true;
                this.showHelpAbortContainer = true;
            }
            else if (tab === "cartPage") {
                this.showHelpAbortContainer = true;
                this.showCartPage =true;
                this.showTopBarButton = true;
            }
            
            else if (tab === "orderHistory") {
                this.orderHistoryShow = true;
            }
            else if (tab === "inventory") {
                this.inventoryShow = true;
            }
            else if (tab === "statistics") {
                this.statisticsShow = true;
            }

        },

        closeIngredMenus: function() {
            this.showButtonBox = false;
            console.log("Closed menus");
        },

        showIngredients: function(ingredTyp) {
            this.showButtonBox = true;
            if (ingredTyp === "base") {
                this.chosenCatName = "base"; 
                this.showIngredientsButtons = true;
                this.showCatButtons = false;
            }
            else if (ingredTyp === "ingredCat") {
                this.chosenCatName = "";
                this.showCatButtons = true;
                this.showIngredientsButtons =false;
            }
            else {
                this.chosenCatName = "topping"; 
                this.showIngredientsButtons = true;
                this.showCatButtons = false;
            }
        },

        /* for use in next step
         else if (ingredTyp === "berry") {
            }
            else if (ingredTyp === "fruit") {

            }
            else if (ingredTyp === "vegetable") {
            }
        */

        /*   createIngredButton: function(catName){
            var ingred_html = document.createElement("ingredient");
            ref="ingredient"
                v-for="item in filtered_ingredients('catName')"
                v-on:addIngredient="addToOrder(item)"  
                :item="item" 
                :lang="lang"
                :key="item.ingredient_id"> 
            th.appendChild(anObj);
            return th;
            }*/


        addType: function(drinkType) {
            drink.type = drinkType;
        },

        addSize: function(drinkSize) {
            drink.size = drinkSize;
        },





        addToOrder: function (item) {
            this.chosenIngredients.push(item);
            console.log("entered addtoorder");
        },

        placeOrder: function () {
            var i,
                //Wrap the order in an object
                order = {
                    ingredients: this.chosenIngredients,
                    volume: this.volume,
                    type: this.type,
                    price: this.price
                };
            // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
            socket.emit('order', {orderId: getOrderNumber(), order: order});
            //set all counters to 0. Notice the use of $refs
            for (i = 0; i < this.$refs.ingredient.length; i += 1) {
                this.$refs.ingredient[i].resetCounter();
            }
            this.volume = 0;
            this.price = 0;
            this.type = '';
            this.chosenIngredients = [];
        },
    }
});


// End Vue


//vm.test=vm.get_categories();

