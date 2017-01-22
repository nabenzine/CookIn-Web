//Define an angular module for our app

var sampleApp = angular.module('CookIn', ['ui.router','ngAnimate', 'ngCookies', 'ngAutocomplete','rzModule','underscore','ngMaterial','kendo.directives','ui.bootstrap', 'gm.datepickerMultiSelect','flow']);

//Define const for app
sampleApp.constant("myConfig",
    {
        //"url": "http://localhost:2262"
        "url": ""
    });


sampleApp.config(['$stateProvider','$urlRouterProvider','$mdDateLocaleProvider','flowFactoryProvider','$httpProvider',

function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, flowFactoryProvider, $httpProvider) {

    // Allow Access-Control-Allow-Origin
/*    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];*/

    // Upload
    flowFactoryProvider.defaults = {
        target: 'http://uploads.im/api?upload',
        permanentErrors: [404, 500, 501],
        testChunks:false,
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 4
    };

    // Routing
    //$urlRouterProvider.otherwise('/accueil');

    $stateProvider
        .state('accueil', {
          url: '/accueil/:date?/:city?/:state?/:country?/:pricemin?/:pricemax?/:nbguests?/:modeConso?/:foodtypes?/:mealtype?/:hostspeaks?/:page?',
          templateUrl: 'recherche.html',
            params: {
                date: {squash: true, value: null}
            },
          reloadOnSearch: false,
          controller: 'SearchCtrl',
          loginRequired: false
        })
        .state('addpublication', {
            url: '/addpublication',
            templateUrl: 'submit.html',
            controller: 'AddPublicationCtrl',
            loginRequired: true
        })
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            templateUrl: 'dashboard.html'
        })
        .state('dashboard.ordersplaced', {
            url: '/ordersplaced',
            templateUrl: 'commandes_passees.html',
            controller: 'OrdersPlacedCtrl',
            loginRequired: true
        })
        .state('dashboard.ordersreceived', {
            url: '/ordersreceived',
            templateUrl: 'commandes_recu.html',
            controller: 'OrdersReceivedCtrl',
            loginRequired: true
        })
        .state('dashboard.mypublications', {
            url: '/mypublications',
            templateUrl: 'my_publications.html',
            controller: 'MyPublicationsCtrl',
            loginRequired: true
        })
        .state('dashboard.profil', {
            url: '/profil',
            templateUrl: 'profil.html',
            loginRequired: true
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl',
            loginRequired: false
        })
        .state('viewpublication', {
            url: '/viewpublication/:id',
            templateUrl: 'detail.html',
            controller: 'PublicationCtrl',
            loginRequired: false
        });

}]);

sampleApp.run(['$rootScope', '$location', '$state', '$cookieStore', '$http', 'Auth',

function($rootScope, $location, $state, $cookieStore, $http, Auth) {

    // Authentifier l'utilisateur la premiére fois qu'il arrive sur l'app
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] =  $rootScope.globals.currentUser.TOKEN_KEY;
    }else{
        $cookieStore.remove('globals');
        $rootScope.globals = {};
        $http.defaults.headers.common.Authorization = '';
    }

    // Vérifier l'authentification à chaque changement de route pour les pages avec login obligatoire
    var postLogInRoute;
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/addpublication', '/dashboard/ordersplaced', '/dashboard/ordersreceived', '/dashboard/mypublications','/dashboard/profil']) != -1;
        if (restrictedPage && !Auth.islogged()) {
            postLogInRoute = $location.path();
            console.log('non autorisé '+ postLogInRoute)
            $location.path('/login');
        }
        else if(postLogInRoute && Auth.islogged()) {
            //once logged in, redirect to the last route and reset it
            console.log('redirection vers: '+ postLogInRoute)
            $location.path(postLogInRoute).replace();
            postLogInRoute = null;
        }
    });


    // Vérifier l'authentification à chaque changement de route pour les pages avec login obligatoire
    /*    var postLogInRoute;
     $rootScope.$on('$stateChangeStart', function (event, next) {
     if (next.loginRequired && !Auth.islogged()) {
     postLogInRoute = $location.path();
     $location.path('/login');
     } else if (postLogInRoute && Auth.islogged()) {
     //once logged in, redirect to the last route and reset it
     $location.path(postLogInRoute).replace();
     postLogInRoute = null;
     }
     });*/

}]);

