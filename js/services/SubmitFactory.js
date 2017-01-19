/**
 * Created by Nad on 17/01/2017.
 */
angular.module('CookIn').factory('SubmitFactory', function($http,$q) {
    // Might use a resource here that returns a JSON array

    var factory = {
        GetLanguesByUtilisateur : GetLanguesByUtilisateur ,
        fillRegimeAlimentaire : fillRegimeAlimentaire,
        GetAdressesByUtilisateur : GetAdressesByUtilisateur,
        GetUtilisateur : GetUtilisateur,
        addAdresse : addAdresse,
        addAnnonce : addAnnonce,
        addSession : addSession
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
            "IDREGIME":2,
            "LIBELLE":"Végétalien"
        },
        {
            "IDREGIME":3,
            "LIBELLE":"Vegan (Relou)"
        }

    ];

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

    var languesParlees = [
        {
            "IDLANGUE":1,
            "LIBELLE":"Français"
        },
        {
            "IDLANGUE":2,
            "LIBELLE":"Anglais"
        }
    ];

    var userDetail = {
        TELEPHONE: '062623432343',
        PROFESSION : 'JE suis gnagnagna'
    }

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//

    function fillRegimeAlimentaire(){
        var deferred = $q.defer();
        $http.get('/api/Regime').
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

    function GetAdressesByUtilisateur(idUtilisateur){
        var deferred = $q.defer();
        $http.get('/api/addressesByUtilisateur?id='+idUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(lieuxEnregistres);
            //deferred.reject(status);
        });
        return deferred.promise;
    };

    function GetUtilisateur(idUtilisateur){
        var deferred = $q.defer();
        $http.get('/api/Utilisateur?id='+idUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(userDetail);
            //deferred.reject(status);
        });
        return deferred.promise;
    };


    function GetLanguesByUtilisateur(idUtilisateur){
        var deferred = $q.defer();
        $http.get('/api/languesByUtilisateur?id='+idUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(languesParlees);
            //deferred.reject(status);
        });
        return deferred.promise;
    };

    function addAnnonce(annonce) {
        var deferred = $q.defer();
        $http.post('/api/Annonce',annonce).
        success(function(data, status, headers, config) {
            if( data === true){
                deferred.resolve(true);
            }else{
                deferred.reject("fail");
            }
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(true);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }

    function addSession(session) {
        var deferred = $q.defer();
        $http.post('/api/Session',session).
        success(function(data, status, headers, config) {
            if( data === true){
                deferred.resolve(true);
            }else{
                deferred.reject("fail");
            }
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(true);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }

    function addAdresse(adresse) {
        var deferred = $q.defer();
        $http.post('/api/Adresse',adresse).
        success(function(data, status, headers, config) {
            if( data === true){
                deferred.resolve(true);
            }else{
                deferred.reject("fail");
            }
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