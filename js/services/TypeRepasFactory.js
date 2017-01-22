/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('TypeRepasFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        fillTypeRepas: fillTypeRepas
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//
    var typeRepas = [
        {
            "IDTYPEREPAS":1,
            "LIBELLE":"Dîner",
            "CODE":"DINER"
        },
        {
            "IDTYPEREPAS":2,
            "LIBELLE":"Déjeuner",
            "CODE":"DEJEUNER"
        },
        {
            "IDTYPEREPAS":3,
            "LIBELLE":"Goûter",
            "CODE":"GOUTER"
        }
    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function fillTypeRepas(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/Type_repas').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(typeRepas);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    return factory;
});