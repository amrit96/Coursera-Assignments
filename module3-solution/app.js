import * as custom_list from "./custom_list"

(function(){
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController ',NarrowItDownController )
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('MenuSearchService',MenuSearchService)
    .directive('found-items', foundItems);

    function foundItems(foundItemList){
        var directive = {}
        directive.restrict = 'E';
        directive.template = ''
        directive.scope = {
            matchList : foundItemList 
        }
    }

    NarrowItDownController .$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService){
        var nidcThis = this;
        nidcThis.searhedTerm = ""
        nidcThis.matchedItems = MenuSearchService.getMatchedMenuItems();
        toBuyThis.bought = function(item_index){
            ShoppingListCheckOffService.buy(item_index);
        }

    }   

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughtThis = this;
        boughtThis.boughtList = ShoppingListCheckOffService.getBoughtList();
    }

    function MenuSearchService()  {
        var serviceThis = this;

        serviceThis.getMatchedMenuItems = function(searchTerm){
            return $http("https://davids-restaurant.herokuapp.com/menu_items.json").then(function (result) {
                // process result and only keep items that match
                var foundItems = []
                for( let i=0; i<result.length; i++){
                    if (searchTerm["menu_items"][i]["description"].includes(searchTerm)){
                        foundItems.push(searchTerm["menu_items"][i])
                    }
                }
                // return processed items
                return foundItems;
            });
        }

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