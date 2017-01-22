/**
 * Created by Nad on 20/01/2017.
 */
/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('ModeConsommationFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        fillModeConsommation: fillModeConsommation
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//
    var modeConso = [
        {
            "IDMODECONSO":1,
            "LIBELLE":"Sur place",
            "CODE":"SURPLACE"
        },
        {
            "IDMODECONSO":2,
            "LIBELLE":"À emporter",
            "CODE":"AEMPORTER"
        }
    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function fillModeConsommation(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/Mode_consommation').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(modeConso);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    return factory;
});