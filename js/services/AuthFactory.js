/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('Auth', function($http, $q, myConfig, $location, $cookieStore, $rootScope) {
    // Might use a resource here that returns a JSON array

    var factory = {
        login: login,
        logout: logout,
        islogged: islogged,
        crypt: crypt
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var userLogged = {
        IDUTILISATEUR: 1,
        PRENOM: "Nad",
        NOM: "Benz",
        VALIDAUTH: true,
        TOKEN_KEY: "9EAF648FAE43245F3FA3F"
    };

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function islogged(){
        var user = $cookieStore.get('globals');
        if(user && user.currentUser){
            return true;
        }else{
            return false;
        }
    };

    function login(user, success, error) {
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/utilisateur/login', user).
            success(function(data, status, headers, config) {
                if(status === 200){
                    SetCredentials(data);
                    deferred.resolve(true);
                }else{
                    deferred.reject("fail");
                }
            }).
            error(function(data, status, headers, config) {
                deferred.reject("fail");
                // or server returns response with an error status.
            });
        return deferred.promise;
    };

    function SetCredentials(user) {
        $rootScope.globals = {
            currentUser: {
                id: user.IDUTILISATEUR,
                nom: user.NOM,
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
    };

    function logout() {
        $cookieStore.remove('globals');
        $rootScope.globals = {};
        $http.defaults.headers.common.Authorization = '';
        $location.path('/accueil');
    };

    function crypt(msg)
    {
        return CryptoJS.SHA1(msg).toString();
    };

    return factory;
});
