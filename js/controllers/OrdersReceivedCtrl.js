/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('OrdersReceivedCtrl',OrdersReceivedFnt);

OrdersReceivedFnt.$inject=['$scope','$rootScope', 'ReservationFactory']

function OrdersReceivedFnt($scope, $rootScope, ReservationFactory ) {

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

