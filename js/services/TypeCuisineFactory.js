/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('TypeCuisineFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        fillTypeCuisine: fillTypeCuisine
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var typeCuisine = [
        {
            "IDCUISINE":1,
            "LIBELLE":"Algérienne",
            "CODE":"ALGERIENNE"
        },
        {
            "IDCUISINE":2,
            "LIBELLE":"Tuinisienne",
            "CODE":"TUNISIENNE"
        },
        {
            "IDCUISINE":3,
            "LIBELLE":"Marocaine",
            "CODE":"MAROCAINE"
        },
        {
            "IDCUISINE":4,
            "LIBELLE":"Française",
            "CODE":"FRANCAISE"
        },
        {
            "IDCUISINE":5,
            "LIBELLE":"Chinoise",
            "CODE":"CHINOISE"
        }
    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function fillTypeCuisine(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/type_cuisine').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(typeCuisine);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    return factory;
});