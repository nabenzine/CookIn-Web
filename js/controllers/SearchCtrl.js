
angular.module('CookIn').controller('SearchCtrl',SearchCtrlFnt);

SearchCtrlFnt.$inject=['$scope','$location', '$window', '$filter', 'SearchFactory', 'GlobalFactory'];

function SearchCtrlFnt($scope,$location, $window, $filter, SearchFactory, GlobalFactory){

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

        $location.path('/searchResult/').search(
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
        //Envoyer l'evenement pour relancer la recherche dans ResultCtrl
        $scope.$emit('reloadSearchQuery')

    }
};
