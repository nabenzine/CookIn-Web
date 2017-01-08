//Define an angular module for our app

var sampleApp = angular.module('CookIn', ['ngRoute','ngAutocomplete','rzModule','underscore']);

//Define Routing for app

sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/search', {
      templateUrl: 'view/accueil.html',
      controller: 'SearchCtrl'
    }).
    when('/searchResult/:date&:city&:state&:country&:pricemin&:pricemax&:nbguests&:modeConso&:foodtypes&:mealtype&:hostspeaks&:page', {
      templateUrl: 'index.html',
      controller: 'ResultCtrl'
    }).
    when('/viewPublication/:idAnnonce', {
      templateUrl: 'detail.html',
      controller: 'PublicationCtrl'
    }).
    otherwise({
      redirectTo: '/searchResult'
    });
  }]);


