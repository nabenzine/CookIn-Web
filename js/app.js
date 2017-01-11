//Define an angular module for our app

var sampleApp = angular.module('CookIn', ['ui.router','ngAnimate', 'ngAutocomplete','rzModule','underscore','ngMap']);

//Define Routing for app

sampleApp.config(['$stateProvider','$urlRouterProvider',

function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/accueil');

    $stateProvider
        .state('accueil', {
          url: '/accueil/:date?/:city?/:state?/:country?/:pricemin?/:pricemax?/:nbguests?/:modeConso?/:foodtypes?/:mealtype?/:hostspeaks?/:page?',
          templateUrl: 'recherche.html',
            params: {
                date: {squash: true, value: null}
            },
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
}]);




