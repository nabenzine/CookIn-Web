/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('SearchFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        fillTypeRepas: fillTypeRepas,
        fillTypeCuisine: fillTypeCuisine,
        fillModeConsommation: fillModeConsommation,
        fillLanguage: fillLanguage,
        startSearch: startSearch
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

    var infos_annonces = [
        {
            "IDANNONCE":1,
            "IDTYPEAMBIANCE":1,
            "UTILISATEUR":{
                "NOM":"Dray",
                "PRENOM":"Dan",
                "PHOTO_PROFIL":"https://scontent.xx.fbcdn.net/v/t1.0-9/14720515_10209221933178827_5270935031424465088_n.jpg?oh=f90cd2d2d9cc1bb81e64089aae8fa9a0&oe=58D90A78",
                "NOTE":4
            },
            "IDTYPEREPAS":2,
            "MODECONSO":{
                "IDMODECONSO":2,
                "LIBELLE":"Sur place",
                "CODE":"SURPLACE"
            },
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
                    "FILENAME": "http://www.beaumontpizz.fr/ressources/images/0d138119fef9.jpg"
                },
                {
                    "ID" : 3,
                    "FILENAME": "http://www.boucherie-grandmaire.com/images/plats1.jpg"
                }
            ],
            "IDCUISINE":1,
            "LIBELLE":"Tajine Marocain",
            "DESCRIPTION":"Venez partager ma chatte avec moi",
            "DATE_ENVOI":"25/12/2016",
            "PRIX":25,
            "ACCEPTATION_AUTO":true,
            "ASSISTER_PREPARATION":false,
            "ACCEPTE_ENFANT":true,
            "ACCEPTE_ANIMAUX":true,
            "RACCOMPAGNE_INVITE":false,
            "QUANTITE_MIN":1,
            "QUANTITE_MAX":3,
            "QUANTITE_ACTUELLE":0
        },
        {
            "IDANNONCE":2,
            "IDTYPEAMBIANCE":1,
            "UTILISATEUR":{
                "NOM":"Khaitay",
                "PRENOM":"Hamza",
                "PHOTO_PROFIL":"https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p206x206/1545576_1498194230409811_7314207517930681087_n.jpg?oh=6d670081f216c3c2c8629816738b1bb5&oe=59088D29",
                "NOTE":3.3
            },
            "IDTYPEREPAS":2,
            "ADRESSE":{
                "IDADRESSE":2,
                "IDUTILISATEUR":3,
                "NUMERO_RUE":30,
                "NOM_RUE":"Cours Emile Zola",
                "CP":"69100",
                "VILLE":"Villeurbanne",
                "ETAT":"Auvergne-Rhône-Alpes",
                "PAYS":"France",
                "LATITUDE":45.76773619999999,
                "LONGITUDE":4.889215599999943,
                "ADRESSE_COMPLETE":"Cours Emile Zola, Villeurbanne, France",
                "ADRESSE_ID":"3cf04a9229a8e04c4724335c2a8ce3a82929fbe3",
                "COMPATIBLE_MAP":true
            },
            "MODECONSO":{
                "IDMODECONSO":1,
                "LIBELLE":"A emporter",
                "CODE":"AEMPORTER"
            },
            "IMAGE_ANNONCE": [
                {
                    "ID" : 1,
                    "FILENAME": "https://az826390.vo.msecnd.net/cdn/media/home/inspiring_recipes/recipes/new_-_r/raclette-1160x650-bs001848-pub-67290-01.ashx?la=fr&mw=1160&w=1160&hash=97DE7BBF2A80113F98073ADB73CA9EEEC745D5E5"
                },
                {
                    "ID" : 2,
                    "FILENAME": "http://www.beaumontpizz.fr/ressources/images/0d138119fef9.jpg"
                },
                {
                    "ID" : 3,
                    "FILENAME": "http://www.boucherie-grandmaire.com/images/plats1.jpg"
                }
            ],
            "IDCUISINE":1,
            "LIBELLE":"Raclette 100% française",
            "DESCRIPTION":"Venez partager ma chatte avec moi",
            "DATE_ENVOI":"25/12/2016",
            "PRIX":16,
            "NOTE":3,
            "ACCEPTATION_AUTO":true,
            "ASSISTER_PREPARATION":false,
            "ACCEPTE_ENFANT":true,
            "ACCEPTE_ANIMAUX":true,
            "RACCOMPAGNE_INVITE":false,
            "QUANTITE_MIN":1,
            "QUANTITE_MAX":3,
            "QUANTITE_ACTUELLE":0
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

    function fillTypeCuisine(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/Specialite').
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

    function startSearch(){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/Recherche').
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(infos_annonces);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    return factory;
});