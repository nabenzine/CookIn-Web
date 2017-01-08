/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('ResultCtrl',ResultCtrlFnt);

ResultCtrlFnt.$inject=['$scope', '$rootScope', '$location', 'anchorSmoothScroll', 'SearchFactory','GlobalFactory']

function ResultCtrlFnt($scope, $rootScope, $location, anchorSmoothScroll, SearchFactory, GlobalFactory) {

    $scope.infosAnnonces = [];
    $rootScope.test = 'ok';
    $scope.executeSearch = function () {
        $scope.lieu =  ($location.search().city !='') ? ($location.search().city) : (($location.search().state!='') ? ($location.search().state) : ($location.search().country))   ;

        // On passe la requette get avec les parametres de l'url
        SearchFactory.startSearch(GlobalFactory.stateParamsToGetRequest($location.search())).then(
            function(payload) {
                $scope.infosAnnonces = payload;
                anchorSmoothScroll.scrollTo('SearchResult');
            },
            function(errorPayload) {
                $log.error('failure loading SearchFactory', errorPayload);
            }
        );
    }

    if ($location.search().hasOwnProperty('country')){
        $scope.executeSearch();
    }
    $rootScope.$on('reloadSearchQuery', function(event) {
        $scope.executeSearch();
    });


    $scope.displayPublication = function(idAnnonce){
        $location.path('/viewPublication/').search(
            {
                publication:idAnnonce
            }
        )
        //$state.go('tab.publication/:id', {id: idAnnonce});
    }


};
