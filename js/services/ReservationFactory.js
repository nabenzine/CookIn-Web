/**
 * Created by Nad on 15/01/2017.
 */

angular.module('CookIn').factory('ReservationFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getReservationsByUtilisateur: getReservationsByUtilisateur,
        getCommandesByUtilisateur: getCommandesByUtilisateur,
        addReservation: addReservation
    };

    var commandes_passe = [
        {
            "IDRESERV": 1,
            "IDUTILISATEUR": 1,
            "IDANNONCE": 2,
            "DATE_DEBUT": "2017-01-26T12:00:00",
            "CODESTATUSRESER": 1,
            "LIBELLE": "Tajine Marocain",
            "QUANTITE": 4,
            "TOTAL" : 115,
            "LIEU" : "Lyon",
            "LIBELLE_CONSO":"Sur place",
            "CODE_CONSO":"SURPLACE",
            "IMAGE_ANNONCE":"http://recettes.al-manakh.com/images/tajine-halal.jpg"
        },
        {
            "IDRESERV": 2,
            "IDUTILISATEUR": 2,
            "IDANNONCE": 1,
            "DATE_DEBUT": "2017-01-14T12:00:00",
            "CODESTATUSRESER": 1,
            "LIBELLE": "Saumon makrout ",
            "QUANTITE": 1,
            "TOTAL" : 23.50,
            "LIEU" : "Villeurbanne",
            "LIBELLE_CONSO":"Sur place",
            "CODE_CONSO":"SURPLACE",
            "IMAGE_ANNONCE":"http://www.boucherie-grandmaire.com/images/plats1.jpg"
        },
        {
            "IDRESERV": 3,
            "IDUTILISATEUR": 2,
            "IDANNONCE": 4,
            "DATE_DEBUT": "2017-01-01T12:00:00",
            "CODESTATUSRESER": 1,
            "LIBELLE": "Cheese Cake",
            "QUANTITE": 7,
            "TOTAL" : 53.50,
            "LIEU" : "Lyon",
            "LIBELLE_CONSO":"A emporter",
            "CODE_CONSO":"AEMPORTER",
            "IMAGE_ANNONCE":"https://3.bp.blogspot.com/-_ToewpnlCMI/UmmDtsoZJhI/AAAAAAAACME/WZfobvBzqj0/s640/cheesecake.jpg"
        }

    ];

    var commandes_recu = [
        {
            "IDRESERV": 2,
            "IDANNONCE": 2,
            "DATE_DEBUT": "2017-01-26T01:30:00",
            "LIBELLE": "Tajine marocain",
            "QUANTITE": 4,
            "TOTAL" : 115,
            "NUMERO_RUE":30,
            "NOM_RUE":"Rue George Sand",
            "CP":"69100",
            "VILLE":"Villeurbanne",
            "IDMODECONSO":1,
            "LIBELLE_CONSO":"Sur place",
            "CODE":"SURPLACE",
            "NOM":"Benzine",
            "PRENOM" : "Nad",
            "TELEPHONE": "0671839283",
            "EMAIL" : "nabenz@gmail.com",
            "IDUTILISATEUR": 2,
            "PHOTO_PROFIL":"https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/12439345_1230530423643497_7601327912280907099_n.jpg?oh=1b552f9baafcc92140101b2bcce24c8d&oe=59033348"
        }
    ];

    function getCommandesByUtilisateur(IdUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/getOrderReceivedByUser?id='+IdUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(commandes_recu);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    };

    function getReservationsByUtilisateur(IdUtilisateur){
        var deferred = $q.defer();
        $http.get(myConfig.url + '/api/reservation/getReservationsByUser?idUtilisateur='+IdUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(commandes_passe);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    };

    function addReservation(reservation){
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/reservation',reservation).
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

    };

    return factory;
});

