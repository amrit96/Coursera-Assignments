(function(){
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuyThis = this;
        toBuyThis.toBuyList = ShoppingListCheckOffService.getToBuyList();
        toBuyThis.bought = function(item_index){
            ShoppingListCheckOffService.buy(item_index);
        }

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughtThis = this;
        boughtThis.boughtList = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService()  {
        var serviceThis = this;
        var shopping_list = {
            'to_buy': [
                {
                    'item': "Cookies",
                    'quantity': 10
                },
                {
                    'item': "Mango",
                    'quantity': 1
                },
                {
                    'item': "Apples",
                    'quantity': 5
                }
            ],
            'bought': []
        };

        serviceThis.buy = function(item_index){
            console.log("Buying in service");
            var bought_item = shopping_list['to_buy'][item_index];
            console.log("Confirming purchase of: "+bought_item);
            shopping_list['to_buy'].splice(item_index,1);
            shopping_list['bought'].push(bought_item);
        }

        serviceThis.getToBuyList = function(){
            return shopping_list['to_buy'];
        }

        serviceThis.getBoughtList = function(){
            return shopping_list['bought'];
        }
    }
})();