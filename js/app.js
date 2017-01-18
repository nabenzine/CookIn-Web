//Define an angular module for our app

var sampleApp = angular.module('CookIn', ['ui.router','ngAnimate', 'ngCookies', 'ngAutocomplete','rzModule','underscore','ngMaterial','kendo.directives','ui.bootstrap', 'gm.datepickerMultiSelect']);

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
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            templateUrl: 'dashboard.html',
        })
        .state('dashboard.ordersplaced', {
            url: '/ordersplaced',
            templateUrl: 'commandes_passees.html',
            controller: 'OrdersPlacedCtrl'
        })
        .state('dashboard.ordersreceived', {
            url: '/ordersreceived',
            templateUrl: 'commandes_recu.html',
            controller: 'OrdersReceivedCtrl'
        })
        .state('dashboard.mypublications', {
            url: '/mypublications',
            templateUrl: 'my_publications.html',
            controller: 'MyPublicationsCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .state('viewpublication', {
          url: '/viewpublication/:id',
          templateUrl: 'detail.html',
          controller: 'PublicationCtrl'
        });

}]);


sampleApp.run(['$rootScope', '$location', '$cookieStore', '$http',

function($rootScope, $location, $cookieStore, $http) {

    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] =  $rootScope.globals.currentUser.TOKEN_KEY;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/accueil', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });

}]);

