/**
 * Created by Nad on 17/01/2017.
 */
angular.module('CookIn').factory('UtilisateurFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getUtilisateur : getUtilisateur,
        updateUtilisateur: updateUtilisateur
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var userDetail = {
        TELEPHONE: '062623432343',
        PROFESSION : 'JE suis Dan Dr Dray'
    }

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function getUtilisateur(idUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/Utilisateur?id='+idUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(userDetail);
            //deferred.reject(status);
        });
        return deferred.promise;
    };


    function updateUtilisateur (utilisateur) {
        var deferred = $q.defer();
        $http.put(myConfig.url + '/api/utilisateur/'+utilisateur.IDUTILISATEUR ,utilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(true);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(true);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    }
    return factory;
});