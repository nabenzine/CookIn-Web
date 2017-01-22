/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('MyPublicationsCtrl',MyPublicationsFnt);

MyPublicationsFnt.$inject=['$scope','$rootScope', '$state', 'Auth', 'AnnonceFactory']

function MyPublicationsFnt($scope, $rootScope, $state, Auth, AnnonceFactory) {
    $scope.today = new Date();
    $scope.annonceUser = [];

    AnnonceFactory.getAnnoncesByUtilisateur($rootScope.globals.currentUser.id).then(
        function(data) {
            $scope.annonceUser = data;
            //console.log(data);
        },
        function(errorPayload) {
            $log.error('failure loading donneesReservation', errorPayload);
        }
    );

};

