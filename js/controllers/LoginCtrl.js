/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('LoginCtrl',MainCtrlFnt);

MainCtrlFnt.$inject=['$scope', '$state', 'Auth']

function MainCtrlFnt($scope, $state, Auth) {

    $scope.showError = false;
    $scope.user = {login:'', password:''};


    $scope.login = function () {
        console.log('login start');
        if ($scope.user_form.$valid) {
            console.log('form valid');
            Auth.login( { EMAIL: $scope.user.login, MOT_DE_PASSE: Auth.crypt($scope.user.password)} ).then(
                function(payload) {
                    console.log('résultat: '+payload);
                    $state.go('accueil');
                },
                function(errorPayload) {
                    $scope.showError = true;
            });
        }
    };

};

