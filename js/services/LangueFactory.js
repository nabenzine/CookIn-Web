/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('LangueFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        fillLanguage: fillLanguage,
        getLanguesByUtilisateur : getLanguesByUtilisateur
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var languesParlees = [
        {
            "IDLANGUE":1,
            "LIBELLE":"Français"
        },
        {
            "IDLANGUE":2,
            "LIBELLE":"Anglais"
        },
        {
            "IDLANGUE":3,
            "LIBELLE":"Arabe"
        },
        {
            "IDLANGUE":4,
            "LIBELLE":"Hérbreu"
        }
    ];

    var languesParleesByUser = [
        {
            "IDLANGUE":1,
            "LIBELLE":"Français"
        },
        {
            "IDLANGUE":2,
            "LIBELLE":"Anglais"
        }
    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function fillLanguage(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/Langue').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(languesParlees);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    function getLanguesByUtilisateur(idUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/langue?idUtilisateur='+idUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(languesParleesByUser);
            //deferred.reject(status);
        });
        return deferred.promise;
    };

    return factory;
});