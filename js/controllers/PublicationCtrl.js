/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('PublicationCtrl',PublicationCtrlFnt);

PublicationCtrlFnt.$inject=['$scope', '$location', '$stateParams', 'AnnonceFactory']

function PublicationCtrlFnt($scope, $location, $stateParams, AnnonceFactory) {

    $scope.donneesAnnonce = [];
    $scope.avisUtilisateurs = [];

    AnnonceFactory.getAnnonce($stateParams.id).then(
        function(dataAnnonce) {
            $scope.donneesAnnonce = dataAnnonce;

            // Récupérer les
            AnnonceFactory.getAvisByUser(dataAnnonce.UTILISATEUR.IDUTILISATEUR).then(
                function(dataAvis) {
                    $scope.avisUtilisateurs = dataAvis;
                },
                function(errorPayload) {
                    $log.error('failure loading getAnnonce', errorPayload);
                }
            );
        },
        function(errorPayload) {
            $log.error('failure loading getAnnonce', errorPayload);
        }
    );
};


