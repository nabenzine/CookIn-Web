/**
 * Created by Nad on 15/01/2017.
 */

angular.module('CookIn').factory('ReservationFactory', function($http,$q) {
    // Might use a resource here that returns a JSON array

    var factory = {
        getReservationsByUtilisateur: getReservationsByUtilisateur,
        addReservation: addReservation
    };

    var donnees_reservation = [
        {
            "IDRESERV": 1,
            "SESSION":{
                "HEURE_DEBUT": "2017-01-16T12:00:00"
            },
            "IDSTATUSRESER": 1,
            "LIBELLE": "Tajine Marocain",
            "NOTE_POUR_CHEF": "Je veux du cacher ma gueule !",
            "QUANTITE": 3,
            "TOTAL" : 83.50,
            "FRAIS_RESERVATION": 7.50,
            "NOM":"Dan",
            "LIEU" : "Lyon",
            "MODECONSO":{
                "IDMODECONSO":2,
                "LIBELLE":"Sur place",
                "CODE":"SURPLACE"
            },
            "IMAGE_ANNONCE":[
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
            ]
        },
        {
            "IDRESERV": 2,
            "SESSION":{
                "HEURE_DEBUT": "2016-12-06T12:00:00"
            },
            "IDSTATUSRESER": 1,
            "LIBELLE": "Tajine Algerien",
            "NOTE_POUR_CHEF": "Je veux du pas cher ma gueule !",
            "QUANTITE": 2,
            "TOTAL" : 55,
            "FRAIS_RESERVATION": 5,
            "NOM":"Nadjib",
            "LIEU" : "Lyon",
            "MODECONSO":{
                "IDMODECONSO":1,
                "LIBELLE":"A emporter",
                "CODE":"AEMPORTER"
            },
            "IMAGE_ANNONCE":[
                {
                    "ID" : 1,
                    "FILENAME": "http://www.beaumontpizz.fr/ressources/images/0d138119fef9.jpg"
                },
                {
                    "ID" : 2,
                    "FILENAME": "http://www.boucherie-grandmaire.com/images/plats1.jpg"
                }
            ]
        }
    ];

    function getReservationsByUtilisateur(IdUtilisateur){
        var deferred = $q.defer();
        $http.get('/api/getReservationList?id='+IdUtilisateur).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(donnees_reservation);
            //deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    };

    function addReservation(reservation){
        var deferred = $q.defer();
        $http.post('/api/Reservation',reservation).
        success(function(data, status, headers, config) {
            if( data.validAuth === true){
                deferred.resolve(true);
            }else{
                deferred.reject("fail");
            }
        }).
        error(function(data, status, headers, config) {
            deferred.reject(status);
            // or server returns response with an error status.
        });
        return deferred.promise;

    };

    return factory;
});

