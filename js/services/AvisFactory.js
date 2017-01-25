/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('AvisFactory', function($http,$q,myConfig,$filter,_) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getAvisByUser: getAvisByUser,
        addAvis: addAvis
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var avis_utilisateurs = [
        {
            "IDAVIS":1,
            "IDANNONCE":1,
            "UTILISATEUR_EMETTEUR":{
                "IDUSEREMETTEUR":1,
                "NOM": "Farid"
            },
            "IDUSERRECEPTERUR":2,
            "NOTE":4,
            "COMMENTAIRE":"Cuisine marocaine pete sa mere !!",
            "ESTCHEF":false
        },
        {
            "IDAVIS":2,
            "IDANNONCE":1,
            "UTILISATEUR_EMETTEUR":{
                "IDUSEREMETTEUR":2,
                "NOM": "Fary"
            },
            "IDUSERRECEPTERUR":2,
            "NOTE":3.3,
            "COMMENTAIRE":"Pas le temps fraté !",
            "ESTCHEF":false
        }
    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//
    function getAvisByUser(IdUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/avis?idUtilisateur='+ IdUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(avis_utilisateurs);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    };

    function addAvis(avis){
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/avis',avis).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(true);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    };

    return factory;
});