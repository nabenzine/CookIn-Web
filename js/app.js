//Define an angular module for our app

var sampleApp = angular.module('CookIn', ['ui.router','ngAnimate', 'ngAutocomplete','rzModule','underscore','ngMaterial','kendo.directives','angular-carousel']);

//Define Routing for app

sampleApp.config(['$stateProvider','$urlRouterProvider','$mdDateLocaleProvider',

function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {
    $urlRouterProvider.otherwise('/accueil');

    $stateProvider
        .state('accueil', {
          url: '/accueil/:date?/:city?/:state?/:country?/:pricemin?/:pricemax?/:nbguests?/:modeConso?/:foodtypes?/:mealtype?/:hostspeaks?/:page?',
          templateUrl: 'recherche.html',
            params: {
                date: {squash: true, value: null}
            },
          reloadOnSearch: false,
          controller: 'SearchCtrl'
        })
        .state('addpublication', {
            url: '/addpublication',
            templateUrl: 'submit.html',
            controller: 'AddPublicationCtrl'
        })
        .state('viewpublication', {
          url: '/viewpublication/:id',
          templateUrl: 'detail.html',
          controller: 'PublicationCtrl'
        });

        $mdDateLocaleProvider.formatDate = function(date) {
            return date? date.format('yyyy-mm-dd'):"";
        };


}]);




