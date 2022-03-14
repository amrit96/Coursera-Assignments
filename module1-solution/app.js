(function(){
    'use strict'
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',luch_counter);

    luch_counter.$inject=['$scope']
    function luch_counter($scope){
        $scope.lunchMenu='';
        $scope.result = '';
        $scope.decide_quantity = function(){
            if( $scope.lunchMenu.length == 0)
                $scope.result = "Please enter data first"
            else{
                var lunch_items_count = $scope.lunchMenu.split(",").length;
                if(lunch_items_count>3){
                    $scope.result = "Too much!"
                }
                else{
                    $scope.result = "Enjoy!"
                }
            }
        }
        
    }
})();