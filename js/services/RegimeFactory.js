/**
 * Created by Nad on 20/01/2017.
 */

angular.module('CookIn').factory('RegimeFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        fillRegimeAlimentaire : fillRegimeAlimentaire
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//


    var regimeAlimentaire = [
        {
            "IDREGIME":1,
            "LIBELLE":"Végétarien"
        },
        {
            "IDREGIME":1,
            "LIBELLE":"Sans gluten"
        },
        {
            "IDREGIMEALIMENTAIRE":1,
            "LIBELLE":"Hallal",
            "CODE":"HALLAL"
        },
        {
            "IDREGIMEALIMENTAIRE":2,
            "LIBELLE":"Cacher",
            "CODE":"CACHER"
        }

    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function fillRegimeAlimentaire(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/regime_alimentaire').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(regimeAlimentaire);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    return factory;
});