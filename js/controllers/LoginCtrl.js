/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('LoginCtrl',MainCtrlFnt);

MainCtrlFnt.$inject=['$scope','$rootScope', '$state', 'Auth']

function MainCtrlFnt($scope, $rootScope, $state, Auth) {

    $scope.showError = false;
    $scope.user = {login:'', password:''};

    $scope.login = function () {
        if ($scope.user_form.$valid) {
            Auth.login( { EMAIL: $scope.user.login, MOT_DE_PASSE: Auth.sha1($scope.user.password)} ).then(
                function(payload) {
                    $state.go('accueil');
                },
                function(errorPayload) {
                    $scope.showError = true;
            });
        }
    };

};

