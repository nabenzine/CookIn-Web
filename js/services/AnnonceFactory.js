/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('AnnonceFactory', function($http,$q,myConfig,$filter,_) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getAnnoncesByUtilisateur : getAnnoncesByUtilisateur,
        getAnnonce: getAnnonce,
        getAvisByUser: getAvisByUser,
        getAvailabilityByAnnonce: getAvailabilityByAnnonce,
        getBookedSessionByAnnonceAndUser: getBookedSessionByAnnonceAndUser,
        jsonAvailabilityToArray : jsonAvailabilityToArray
    };

    var listAnnoncesUser = [
        {
            "IDANNONCE":1,
            "IDTYPEREPAS":{
                "IDTYPEREPAS":1,
                "LIBELLE":"Dîner",
                "CODE":"DINER"
            },
            "IMAGE_ANNONCE": [
                {
                    "ID" : 1,
                    "FILENAME": "http://recettes.al-manakh.com/images/tajine-halal.jpg"
                }
            ],
            "MODECONSO":{
                "IDMODECONSO":2,
                "LIBELLE":"Sur place",
                "CODE":"SURPLACE"
            },
            "SPECIALITE": {
                "IDCUISINE": 1,
                "LIBELLE": "Marocaine",
                "CODE": "MAROCAINE"
            },
            "LIBELLE":"Tajine Marocain",
            "DESCRIPTION":"Allez viens on est bien ;)",
            "DATE_ENVOI":"20/12/2016",
            "PRIX":31,
            "QUANTITE_MIN":2,
            "QUANTITE_MAX":6
        },
        {
            "IDANNONCE":1,
            "IDTYPEREPAS":{
                "IDTYPEREPAS":1,
                "LIBELLE":"Dîner",
                "CODE":"DINER"
            },
            "IMAGE_ANNONCE": [
                {
                    "ID" : 1,
                    "FILENAME": "http://mooc.tela-botanica.org/pluginfile.php/51685/mod_forum/post/6937/couscous.jpg"
                }
            ],
            "MODECONSO":{
                "IDMODECONSO":2,
                "LIBELLE":"À emporter",
                "CODE":"AEMPORTER"
            },
            "SPECIALITE": {
                "IDCUISINE": 1,
                "LIBELLE": "Algérienne",
                "CODE": "ALGERIENNE"
            },
            "LIBELLE":"Couscous",
            "DESCRIPTION":"Allez viens on est bien ;)",
            "DATE_ENVOI":"25/12/2016",
            "PRIX":25,
            "QUANTITE_MIN":2,
            "QUANTITE_MAX":6
        }
    ];

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
        "ADRESSE": {
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
        "IMAGE_ANNONCE": [
            {
                "ID" : 1,
                "FILENAME": "http://recettes.al-manakh.com/images/tajine-halal.jpg"
            },
            {
                "ID" : 2,
                "FILENAME": "https://i.ytimg.com/vi/QR0EB8Z5itA/maxresdefault.jpg"
            }
        ],
        "MODECONSO":{
            "IDMODECONSO":2,
            "LIBELLE":"Sur place",
            "CODE":"SURPLACE"
        },
        "SPECIALITE": {
            "IDCUISINE": 1,
            "LIBELLE": "Marocaine",
            "CODE": "MAROCAINE"
        },
        "REGIMES" :
            [
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
            ],
        "LIBELLE":"Tajine Marocain",
        "DESCRIPTION":"Je vous propose de partager un bon Tajine du bled",
        "DATE_ENVOI":"25/12/2016",
        "PRIX":25,
        "ACCEPTATION_AUTO":true,
        "ASSISTER_PREPARATION":false,
        "ACCEPTE_ENFANT":true,
        "ACCEPTE_ANIMAUX":true,
        "RACCOMPAGNE_INVITE":false,
        "QUANTITE_MIN":2,
        "QUANTITE_MAX":6,
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

    var session = [
        {
            "IDSESSION": 1,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-01-24T12:00:00",
            "DATE_FIN": "2017-01-24T13:00:00",
            "QUANTITE_RESTANTE": 3
        },
        {
            "IDSESSION": 2,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-01-26T12:00:00",
            "DATE_FIN": "2017-01-26T13:00:00",
            "QUANTITE_RESTANTE": 6
        },
        {
            "IDSESSION": 3,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-02-04T12:00:00",
            "DATE_FIN": "2017-02-04T13:00:00",
            "QUANTITE_RESTANTE": 2
        },
        {
            "IDSESSION": 4,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-02-14T12:00:00",
            "DATE_FIN": "2017-02-14T13:00:00",
            "QUANTITE_RESTANTE": 4
        },
        {
            "IDSESSION": 5,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-02-19T12:00:00",
            "DATE_FIN": "2017-02-19T13:00:00",
            "QUANTITE_RESTANTE": 11
        },
        {
            "IDSESSION": 6,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-02-24T12:00:00",
            "DATE_FIN": "2017-02-24T13:00:00",
            "QUANTITE_RESTANTE": 3
        },
    ];

    var reservationPassee = [
        {
            "IDSESSION": 4,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-02-14T12:00:00",
            "DATE_FIN": "2017-02-14T13:00:00",
            "QUANTITE_RESTANTE": 4
        }
    ]

    // Methodes

    function getAnnoncesByUtilisateur(IdUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/AnnonceUtilisateur?id='+IdUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(listAnnoncesUser);
            //deferred.reject(status);
            // or server returns response with an error status.
        });

        return deferred.promise;
    }

    function getAnnonce(IdAnnonce){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/annonce/annonceDetails?idAnnonce='+IdAnnonce).
        success(function(data, status, headers, config) {
            console.log(data);
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(donnees_annonce);
            //deferred.reject(status);
            // or server returns response with an error status.
        });

        return deferred.promise;
    }

    function getBookedSessionByAnnonceAndUser(IdAnnonce, IdUser){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/getBookedSessionByAnnonceAndUser?idAnnonce='+IdAnnonce+'&idUser='+IdUser).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(reservationPassee);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }

    function getAvailabilityByAnnonce(IdAnnonce){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/getAvailabilityByAnnonce?id='+IdAnnonce).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(session);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    }

    function getAvisByUser(IdUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/AvisByUser?id='+ IdUtilisateur).
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

    function jsonAvailabilityToArray(data) {
        var groupedByDate = _.groupBy(data, function(item) {
            var dateMoment = 'key'+$filter('date')(item.DATE_DEBUT, "ddMMyyyy");
            return dateMoment;
        });
        return groupedByDate;
    }

    return factory;
});