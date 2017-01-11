
angular.module('CookIn').controller('SearchCtrl',SearchCtrlFnt);

SearchCtrlFnt.$inject=['$scope','$location','$stateParams', '$filter', 'anchorSmoothScroll', 'SearchFactory','GlobalFactory'];

function SearchCtrlFnt($scope,$location, $stateParams, $filter, anchorSmoothScroll, SearchFactory, GlobalFactory){

    // list des données
    $scope.typeCuisine = {};
    $scope.typeRepas = {};
    $scope.modeConsommation = {};
    $scope.languesParlees = {};

    // elements selectionnées par l'utilisateur
    $scope.typeRepasChoice = {};
    $scope.typeCuisineChoice = {};
    $scope.languesParleesChoice = {};

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

    $scope.startSearch = function (data) {
        var typeCuisineParameters = GlobalFactory.checkBoxToGetParametes($scope.typeCuisineChoice);
        var typeRepasParameters = GlobalFactory.checkBoxToGetParametes($scope.typeRepasChoice);
        var languesParleesParameters = GlobalFactory.checkBoxToGetParametes($scope.languesParleesChoice);

        $location.path('/accueil/').search(
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
            }
        );

    }

    if ($location.search().hasOwnProperty('country')){
        $scope.infosAnnonces = [];


        $scope.lieu =  $location.search().country;
        //$scope.lieu =  ($location.search().city !='') ? ($location.search().city) : (($location.search().state!='') ? ($location.search().state) : ($location.search().country))   ;
        $scope.showNoResult = true;

        // On passe la requette get avec les parametres de l'url
        SearchFactory.startSearch(GlobalFactory.stateParamsToGetRequest($location.search())).then(
            function(payload) {
                $scope.infosAnnonces = payload;
                anchorSmoothScroll.scrollTo('showMapResult');

                if(payload != ''){
                    var _latitude = 45.764043;
                    var _longitude = 4.835658999999964;
                    var element = "map-item";
                    var useAjax = false;
                    bigMap(_latitude,_longitude, element, useAjax);
                }
            },
            function(errorPayload) {
                $log.error('failure loading SearchFactory', errorPayload);
            }
        );
    }else{
        $scope.showNoResult = false;
    }

};
