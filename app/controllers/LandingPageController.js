
/* global angular */
'use strict';

app.controller('LandingPageController', ['$scope', '$window', function($scope, $window){
    var vm = this;
    $scope.positionSelected = 'promoters';
    $scope.application = {};

    $scope.applicationSent = false;
    $scope.applicationInProgress = false;

    // this function is called on start up, get the necessary data here
    vm.init = function(){
        Parse.initialize("tkItk2kkSyvQtkyaRmImxGC6ZPNXYPZCenkvgbuQ", "teE9Ak1WfrKgp1Cyzyi5yKnUN45cVOWojmWr1h6O");
    };

    $scope.linkTo = function(link) {
        $window.location.href = link;
    };

    // route the user to the correct event on docksocial
    $scope.goToEvent = function(event) {
        // if no event given, go to docksocial.com
        if (!event) {
            $window.location.href = 'https://www.docksocial.com';
        }
    };

    // save the users application, call cloud code function to send the email
    $scope.saveApplication = function(form) {
        if ($scope.applicationInProgress || $scope.applicationSent) {
            return;
        }
        $scope.applicationInProgress = true;

        var Application = Parse.Object.extend("Application");
        var application = new Application();

        application.set("Name", form.name);
        application.set("College", form.college);
        application.set("Email", form.email);
        application.set("PhoneNumber", form.phoneNumber);
        application.set("Info", form.info);
        application.set("Position", form.position);

        application.save({
            success: function(result) {
                Parse.Cloud.run('sendApplicationEmail', form, {
                    success: function(result) {
                        $scope.applicationSent = true;
                        $scope.applicationError = false;
                        $scope.applicationInProgress = false;
                        $scope.$apply();
                    },
                    error: function(error) {
                        console.error('Error: ' + error);
                    }
                })
            },
            error: function(error) {
                console.error('Error saving the application: ' + error);
            }
        });
    };

    vm.init();
}]);