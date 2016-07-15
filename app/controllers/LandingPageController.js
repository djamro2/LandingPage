
/* global angular */
'use strict';

app.controller('LandingPageController', ['$scope', '$window', function($scope, $window){

    var vm = this;
    $scope.positionSelected = 'promoters';

    // this function is called on start up, get the necessary data here
    vm.init = function(){
        Parse.initialize("tkItk2kkSyvQtkyaRmImxGC6ZPNXYPZCenkvgbuQ", "teE9Ak1WfrKgp1Cyzyi5yKnUN45cVOWojmWr1h6O");
    };

    $scope.goToEvent = function(event) {
        // if no event given, go to docksocial.com
        if (!event) {
            $window.location.href = 'https://www.docksocial.com';
        }
    };

    vm.init();
}]);