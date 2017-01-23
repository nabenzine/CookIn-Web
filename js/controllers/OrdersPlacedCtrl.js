/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('OrdersPlacedCtrl',OrdersPlacedFnt);

OrdersPlacedFnt.$inject=['$scope','$rootScope', 'ReservationFactory', 'AvisFactory', '$mdDialog']

function OrdersPlacedFnt($scope, $rootScope, ReservationFactory, AvisFactory, $mdDialog ) {

    $scope.today = new Date();
    $scope.reservationPassees = [];
    selectedIndex = null;

    ReservationFactory.getReservationsByUtilisateur($rootScope.globals.currentUser.id).then(
        function(data) {
            $scope.reservationPassees = data;
        },
        function(errorPayload) {
            $log.error('failure loading donneesReservation', errorPayload);
        }
    );

    // Modal pour mettre un avis
    $scope.showPrompt = function($event, index) {
        // Mettre à jours l'id annonce et utilisateur
        selectedIndex = index;

        $mdDialog.show({
            targetEvent: $event,
            templateUrl: 'view/add_review.html',
            controller: 'AddReviewCtrl',
            clickOutsideToClose:true
        })
        .then(function(data) {
            // Insérer l'avis
            $scope.insertAvis(data);
        }, function() {
            console.log('You cancelled the dialog')
        });
    };

    $scope.insertAvis = function (data) {
        var avis = {
            IDANNONCE: $scope.reservationPassees[selectedIndex].IDANNONCE,
            IDUSERECEPTEUR: $scope.reservationPassees[selectedIndex].IDUTILISATEUR,
            IDUSEREMETTEUR: $rootScope.globals.currentUser.id,
            NOTE: data.note,
            TITRE: data.titre,
            COMMENTAIRE: data.commentaire,
            ESTCHEF: false
        };

        // Appel au service pour ajouter l'avis
        AvisFactory.addAvis(avis).then(
            function (data) {
                // Mettre à jours la vue
                //$scope.reservationPassees[selectedIndex]
            },
            function (error) {
            }
        );
    }

};

