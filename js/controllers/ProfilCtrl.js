/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('ProfilCtrl',ProfilCtrlFnt);

ProfilCtrlFnt.$inject=['$scope', '$state', '$rootScope', 'UtilisateurFactory', 'AdresseFactory']

function ProfilCtrlFnt($scope, $state, $rootScope, UtilisateurFactory, AdresseFactory) {

    // liste des données
    $scope.user = {};
    $scope.adresses =[];
    $scope.latitude = {};

    $scope.longitude = {};

    $scope.showNewMapInput = false;
    $scope.updateSucceded = false;


    // Créer ou mettre à jour la map

    UtilisateurFactory.getUtilisateur($rootScope.globals.currentUser.id).then(function(user) {
        $scope.user= user;
    });

    AdresseFactory.getAdressesByUtilisateur($rootScope.globals.currentUser.id).then(function(adresses) {
        $scope.adresses= adresses;
        // Positionner sur la premiére adresse
        $scope.adresse = adresses[0];
        $scope.placemap();
    });

    $scope.placemap = function() {
        if($scope.adresse == null | $scope.adresse == undefined){
            $scope.showNewMapInput = true;
        }
        else
        {
            $scope.showNewMapInput = false;
            $scope.latitude=$scope.adresse.LATITUDE;
            $scope.longitude=$scope.adresse.LONGITUDE;
            var element = "map-item";

            simpleMap($scope.latitude,$scope.longitude, element);

        }
    };


    $scope.updateUser = function () {
        $scope.updateSucceded = false;
        if ($scope.userProfil.$valid){
            UtilisateurFactory.updateUtilisateur($scope.user).then(
                function (data) {
                    $scope.updateSucceded = true;
                },
                function (error) {
                    $scope.updateSucceded = false;

                }
            );
        }
    }

};
