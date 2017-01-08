/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('PublicationCtrl',PublicationCtrlFnt);

PublicationCtrlFnt.$inject=['$scope', '$location', '$routeParams', 'AnnonceFactory']

function PublicationCtrlFnt($scope, $location, $routeParams, AnnonceFactory) {

    console.log($routeParams)
    console.log($location)

    $scope.donneesAnnonce = [];
    $scope.avisUtilisateurs = [];
    $scope.prop1 = 3;

    AnnonceFactory.getAnnonce($routeParams.id).then(
        function(dataAnnonce) {
            $scope.donneesAnnonce = dataAnnonce;

            // Récupérer les
            AnnonceFactory.getAvisByUser(dataAnnonce.UTILISATEUR.IDUTILISATEUR).then(
                function(dataAvis) {
                    $scope.avisUtilisateurs = dataAvis;
                },
                function(errorPayload) {
                    $log.error('failure loading TypeRepas', errorPayload);
                }
            );
        },
        function(errorPayload) {
            $log.error('failure loading TypeRepas', errorPayload);
        }
    );
};


