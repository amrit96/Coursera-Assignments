(function(){
    'use strict'
    angular.model('LunchCheck',[])
    .controller('LunchCheckController',luch_counter);

    luch_counter.$inject=['$scope']
    function luch_counter($scope){
        $scope.lunchMenu='';
        $scope.result = '';
        $scope.decide_quantity = function(){
            lunch_items_count = $scope.lunchMenu.split(",").length;
            if(lunch_items_count>3){
                $scope.result = "Too much!"
            }
            else if(lunch_items_count==0){
                $scope.result = "Please enter data first"
            }
            else{
                $scope.result = "Enjoy!"
            }
        }
        
    }
})();