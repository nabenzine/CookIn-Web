/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('OrdersPlacedCtrl',OrdersPlacedFnt);

OrdersPlacedFnt.$inject=['$scope','$rootScope', '$state', 'ReservationFactory','Auth']

function OrdersPlacedFnt($scope, $rootScope, $state, ReservationFactory, Auth ) {

    Auth.islogin();

    $scope.today = new Date();
    $scope.reservationPassees = []

    ReservationFactory.getReservationsByUtilisateur($rootScope.globals.currentUser.id).then(
        function(data) {
            $scope.reservationPassees = data;
            //console.log(data);
        },
        function(errorPayload) {
            $log.error('failure loading donneesReservation', errorPayload);
        }
    );

};

