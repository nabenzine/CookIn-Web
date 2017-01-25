/**
 * Created by Nad on 17/01/2017.
 */
angular.module('CookIn').factory('AdresseFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getAdressesByUtilisateur : getAdressesByUtilisateur,
        addAdresse : addAdresse
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var lieuxEnregistres = [
        {
            "IDADRESSE":1,
            "IDUTILISATEUR":2,
            "NUMERO_RUE":30,
            "NOM_RUE":"Rue George Sand",
            "CP":"69100",
            "VILLE":"Villeurbanne",
            "ETAT":"Auvergne-Rhône-Alpes",
            "PAYS":"France",
            "LATITUDE":45.7550416,
            "LONGITUDE":4.888795200000004,
            "ADRESSE_COMPLETE":"30 Rue George Sand, 69100 Villeurbanne, France",
            "ADRESSE_ID":"ChIJCZgLGsnB9EcRojLtubUeUZs",
            "COMPATIBLE_MAP":true
        },

        {
            "IDADRESSE":2,
            "IDUTILISATEUR":3,
            "NUMERO_RUE":1,
            "NOM_RUE":"Rue Antoine Primat",
            "CP":"69100",
            "VILLE":"Villeurbanne",
            "ETAT":"Auvergne-Rhône-Alpes",
            "PAYS":"France",
            "LATITUDE":45.7580942,
            "LONGITUDE":4.8886761,
            "ADRESSE_COMPLETE":"1 Rue Antoine Primat, 69100 Villeurbanne, France",
            "ADRESSE_ID":"ChIJCZgLGsnB9EcRojLtubUeUZs",
            "COMPATIBLE_MAP":true
        }

    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function getAdressesByUtilisateur(idUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/adresse?idUtilisateur='+idUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(lieuxEnregistres);
            //deferred.reject(status);
        });
        return deferred.promise;
    };

    function addAdresse(adresse) {
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/Adresse',adresse).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.reject(status);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }


    return factory;
});