/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('AnnonceFactory', function($http,$q) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getAnnonce: getAnnonce,
        getAvisByUser: getAvisByUser
    };


    var donnees_annonce =
    {
        "IDANNONCE":1,
        "IDTYPEAMBIANCE":1,
        "UTILISATEUR":{
            "IDUTILISATEUR": 1,
            "NOM":"Dray",
            "PRENOM" : "Dan",
            "PHOTO_PROFIL":"https://scontent.xx.fbcdn.net/v/t1.0-9/14720515_10209221933178827_5270935031424465088_n.jpg?oh=f90cd2d2d9cc1bb81e64089aae8fa9a0&oe=58D90A78",
            "NOTE":4,
            "LANGUE":[
                {
                    "IDLANGUE":1,
                    "LIBELLE":"Français",
                    "CODE":"Francais"
                },
                {
                    "IDLANGUE":2,
                    "LIBELLE":"Anglais",
                    "CODE":"Anglais"
                }]
        },
        "IDTYPEREPAS":2,
        "ADRESSE":"ADRESSE_ID",
        "MODECONSO":{
            "IDMODECONSO":2,
            "LIBELLE":"Sur place",
            "CODE":"SURPLACE"
        },
        "IDSPECIALITE":1,
        "LIBELLE":"Tajine Marocain",
        "DESCRIPTION":"Allez viens on est bien ;)",
        "DATE_ENVOI":"25/12/2016",
        "PRIX":25,
        "ACCEPTATION_AUTO":true,
        "ASSISTER_PREPARATION":false,
        "ACCEPTE_ENFANT":true,
        "ACCEPTE_ANIMAUX":true,
        "RACCOMPAGNE_INVITE":false,
        "QUANTITE_MIN":1,
        "QUANTITE_MAX":3,
        "QUANTITE_ACTUELLE":0,
    }

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

    function getAnnonce(IdAnnonce){
        var deferred = $q.defer();
        $http.get('/api/AnnonceDetails?id=IdAnnonce').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(donnees_annonce);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    }

    function getAvisByUser(IdUtilisateur){
        var deferred = $q.defer();
        $http.get('/api/AvisByUser?id=IdUtilisateur').
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
    return factory;
});