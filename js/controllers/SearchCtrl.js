
angular.module('CookIn').controller('SearchCtrl',SearchCtrlFnt);

SearchCtrlFnt.$inject=['$scope','$state', '$location','$stateParams', '$filter', 'anchorSmoothScroll', 'SearchFactory','GlobalFactory'];

function SearchCtrlFnt($scope, $state, $location, $stateParams, $filter, anchorSmoothScroll, SearchFactory, GlobalFactory){
    console.log('rechargement');
    // list des données
    $scope.typeCuisine = {};
    $scope.typeRepas = {};
    $scope.modeConsommation = {};
    $scope.languesParlees = {};

    // elements selectionnées par l'utilisateur
    $scope.typeRepasChoice = {};
    $scope.typeCuisineChoice = {};
    $scope.languesParleesChoice = {};
    $scope.location = {};
    // Conf du slider
    $scope.minRangeSlider = {
        minValue: 10,
        maxValue: 90,
        options: {
            minRange : 10,
            noSwitching: true,
            floor: 0,
            ceil: 100,
            translate: function (value) {
                return '€' + value;
            }
        }
    };

    // Fonction d'incrémentation et décrementation du nombre d'invité
    $scope.decrementNbPersonnes = function () {
        if($scope.cpt == 1){
            $scope.cpt = '';
        }else {
            $scope.cpt --;
        }
    }


    // Afficher la div NbPersonnes
    $scope.showNbPersonnes = true;
    $scope.updateModeConsoLabel = function (value) {
        var codeModeConso = GlobalFactory.findElement($scope.modeConsommation, "IDMODECONSO", value)
        if(codeModeConso.CODE === 'SURPLACE'){
            $scope.showNbPersonnes = true;
        }else {
            $scope.cpt = null;
            $scope.showNbPersonnes = false;
        }
    }

    SearchFactory.fillTypeRepas().then(
        function(payload) {
            $scope.typeRepas = payload;
        },
        function(errorPayload) {
            $log.error('failure loading TypeRepas', errorPayload);
        }
    );

    SearchFactory.fillTypeCuisine().then(
        function(payload) {
            $scope.typeCuisine = payload;
        },
        function(errorPayload) {
            $log.error('failure loading TypeCuisine', errorPayload);
        }
    );


    SearchFactory.fillModeConsommation().then(
        function(payload) {
            $scope.modeConsommation = payload;
            // Choix par défaut on selectionne surPlace
            $scope.modeConsoChoice = GlobalFactory.findElement($scope.modeConsommation, "CODE", "SURPLACE").IDMODECONSO  ;
        },
        function(errorPayload) {
            $log.error('failure loading ModeConso', errorPayload);
        }
    );

    SearchFactory.fillLanguage().then(
        function(payload) {
            $scope.languesParlees = payload;
        },
        function(errorPayload) {
            $log.error('failure loading FillLanguage', errorPayload);
        }
    );

    $scope.changeSearchUrl = function (data) {
        var typeCuisineParameters = GlobalFactory.checkBoxToGetParametes($scope.typeCuisineChoice);
        var typeRepasParameters = GlobalFactory.checkBoxToGetParametes($scope.typeRepasChoice);
        var languesParleesParameters = GlobalFactory.checkBoxToGetParametes($scope.languesParleesChoice);
        $scope.location = GlobalFactory.findComponent(data, 'location');
        $scope.location = {lat: data.geometry.location.lat(), lng: data.geometry.location.lng()};
        $state.go('accueil',
            {
                date:$filter('date')($scope.dateChoice, "dd/MM/yyyy"),
                country:GlobalFactory.findComponent(data, 'country'),
                state:GlobalFactory.findComponent(data, 'administrative_area_level_1'),
                city:GlobalFactory.findComponent(data, 'administrative_area_level_3') || GlobalFactory.findComponent(data, 'locality'),
                pricemin:$scope.minRangeSlider.minValue,
                pricemax:$scope.minRangeSlider.maxValue,
                nbguests:$scope.cpt,
                modeConso : $scope.modeConsoChoice,
                foodtypes:typeCuisineParameters,
                mealtype:typeRepasParameters,
                hostspeaks:languesParleesParameters,
                page : 1
            });
        //lancer la recherche
        $scope.searchPublications();
    }

    // Fonction de recherche
    $scope.searchPublications = function () {
        $scope.infosAnnonces = [];


        $scope.lieu =  $location.search().country;
        //$scope.lieu =  ($location.search().city !='') ? ($location.search().city) : (($location.search().state!='') ? ($location.search().state) : ($location.search().country))   ;
        $scope.showNoResult = true;

        // On passe la requette get avec les parametres de l'url
        SearchFactory.startSearch(GlobalFactory.stateParamsToGetRequest($location.search())).then(
            function(payload) {
                $scope.infosAnnonces = payload;
                console.log($scope.location);
                if(payload != '' && !$filter('JsonIsEmpty')($scope.location)){
                    var _latitude = $scope.location.lat;
                    var _longitude = $scope.location.lng;
                    var element = "map-item";
                    var useAjax = false;
                    bigMap(_latitude,_longitude, element, useAjax);
                }
                anchorSmoothScroll.scrollTo('SearchResult');
            },
            function(errorPayload) {
                $log.error('failure loading SearchFactory', errorPayload);
            }
        );
    };

    // Si mise à jours de la page
    if ($location.search().hasOwnProperty('country')){
        $scope.searchPublications();
    }
    else
    {
        $scope.showNoResult = false;
    }


};
