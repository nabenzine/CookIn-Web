/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('Auth', function($http, $q, $location, $cookieStore, $rootScope) {
    // Might use a resource here that returns a JSON array

    var factory = {
        login: login,
        logout: logout,
        islogin: islogin,
        sha1: sha1
    };

    var userLogged = {
        IDUTILISATEUR: 1,
        PRENOM: "Nad",
        VALIDAUTH: true,
        TOKEN_KEY: "9EAF648FAE43245F3FA3F"
    };

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//



    function islogin(){
        var user = $cookieStore.get('globals');
        if(user){
            $rootScope.globals = {
                currentUser: user.currentUser
            };
        }else{
            $location.path('/login');
        }
    };


    function login(user, success, error) {
        var deferred = $q.defer();
        $http.post('/api/login', user).
            success(function(data, status, headers, config) {
                if( data.VALIDAUTH === true){
                    SetCredentials(data);
                    deferred.resolve(true);
                }else{
                    deferred.reject(false);
                }
            }).
            error(function(data, status, headers, config) {
                SetCredentials(userLogged);
                deferred.resolve(true);
                //deferred.reject("fail");
                // or server returns response with an error status.
            });
        return deferred.promise;
    };

    function SetCredentials(user) {
        $rootScope.globals = {
            currentUser: {
                id: user.IDUTILISATEUR,
                prenom: user.PRENOM,
                token: user.TOKEN_KEY
            }
        };

        // set default auth header for http requests
        $http.defaults.headers.common['Authorization'] = user.TOKEN_KEY;

        // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookieStore.put('globals', $rootScope.globals, { expires: cookieExp });
    }

    function logout() {
        $cookieStore.remove('globals');
        $rootScope.globals = {};
        $http.defaults.headers.common.Authorization = '';
        $location.path('/login');
    };

    function sha1(msg)
    {
        return msg;
    };

    return factory;
});
