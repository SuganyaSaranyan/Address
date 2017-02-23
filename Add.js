/**
 * Created by Suganya on 20-02-2017.
 */
(function(angular){
    'use strict';

    angular.module("myApp",[])
        .controller('dropdownCtrl',['$scope','$http', function($scope, $http) {
                var data;
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/onpageLoad',
                    data: data,
                }).then(function successCallback(response) {
                    $scope.countries=response.data;
                    
                }, function errorCallback(response) {
                    console.log(response);
                });

            




        }]);


})(window.angular);