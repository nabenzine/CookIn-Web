/**
 * Created by Nad on 05/01/2017.
 */

angular.module('CookIn').factory('AnnonceFactory', function($http,$q,myConfig,_) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getAnnoncesByUtilisateur : getAnnoncesByUtilisateur,
        searchAnnonces: searchAnnonces,
        getAnnonceDetail: getAnnonceDetail,
        addAnnonce : addAnnonce
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

    var infos_recherche_annonces = [
        {
            "PRENOM":"Dray",
            "PHOTO_PROFIL":"https://scontent.xx.fbcdn.net/v/t1.0-9/14720515_10209221933178827_5270935031424465088_n.jpg?oh=f90cd2d2d9cc1bb81e64089aae8fa9a0&oe=58D90A78",
            "NOTE":4,
            "IDANNONCE":1,
            "LIBELLE":"Tajine Marocain",
            "IMAGE_ANNONCE":"http://recettes.al-manakh.com/images/tajine-halal.jpg",
            "PRIX":34,
            "MODECONSO_CODE":"SURPLACE",
            "MODECONSO_LIBELLE":"sur place",
            "VILLE":"Villeurbanne",
            "PAYS":"France",
            "LATITUDE": 45.7550416,
            "LONGITUDE" : 4.888795200000004,
            "ADRESSE_COMPLETE" : "30 Rue George Sand, 69100 Villeurbanne, France"
        },
        {
            "PRENOM":"Hamza",
            "PHOTO_PROFIL":"https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p206x206/1545576_1498194230409811_7314207517930681087_n.jpg?oh=6d670081f216c3c2c8629816738b1bb5&oe=59088D29",
            "NOTE":3.3,
            "IDANNONCE":2,
            "LIBELLE":"Raclette 100% française",
            "IMAGE_ANNONCE":"https://az826390.vo.msecnd.net/cdn/media/home/inspiring_recipes/recipes/new_-_r/raclette-1160x650-bs001848-pub-67290-01.ashx?la=fr&mw=1160&w=1160&hash=97DE7BBF2A80113F98073ADB73CA9EEEC745D5E5",
            "PRIX":34,
            "MODECONSO_CODE":"SURPLACE",
            "MODECONSO_LIBELLE":"sur place",
            "VILLE":"Villeurbanne",
            "PAYS":"France",
            "LATITUDE": 45.76773619999999,
            "LONGITUDE" : 4.889215599999943,
            "ADRESSE_COMPLETE" : "Cours Emile Zola, Villeurbanne, France"
        }
    ];

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

    var donnees_annonce_detail =
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
    };

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//
    function searchAnnonces(filters){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/annonce/search?'+filters).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(infos_recherche_annonces);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    function getAnnoncesByUtilisateur(IdUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/annonce/annonceutilisateur?idUtilisateur='+IdUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(listAnnoncesUser);
            //deferred.reject(status);
            // or server returns response with an error status.
        });

        return deferred.promise;
    };

    function getAnnonceDetail(IdAnnonce){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/annonce/annonceDetails?idAnnonce='+IdAnnonce).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(donnees_annonce_detail);
            //deferred.reject(status);
            // or server returns response with an error status.
        });

        return deferred.promise;
    };

    function addAnnonce(annonce) {
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/Annonce',annonce).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;
    };

    return factory;
});