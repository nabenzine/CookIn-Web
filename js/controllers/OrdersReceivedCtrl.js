/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('OrdersReceivedCtrl',OrdersReceivedFnt);

OrdersReceivedFnt.$inject=['$scope','$rootScope', '$state', 'ReservationFactory', 'AnnonceFactory', 'Auth']

function OrdersReceivedFnt($scope, $rootScope, $state, ReservationFactory, AnnonceFactory, Auth ) {

    Auth.islogin();

    $scope.today = new Date();
    $scope.reservationRecues = [];

    ReservationFactory.getCommandesByUtilisateur($rootScope.globals.currentUser.id).then(
        function(data) {
            $scope.reservationRecues = data;
        },
        function(errorPayload) {
            $log.error('failure loading donneesReservation', errorPayload);
        }
    );

};

