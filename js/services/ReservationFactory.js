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
            "DATE_DEBUT": "2017-01-26T12:00:00",
            "CODESTATUSRESER": 1,
            "LIBELLE": "Tajine Algérien",
            "QUANTITE": 3,
            "TOTAL" : 83.50,
            "LIEU" : "Lyon",
            "LIBELLE_CONSO":"Sur place",
            "CODE_CONSO":"SURPLACE",
            "IMAGE_ANNONCE":"http://recettes.al-manakh.com/images/tajine-halal.jpg"
        },
        {
            "IDRESERV": 1,
            "DATE_DEBUT": "2017-01-14T12:00:00",
            "CODESTATUSRESER": 1,
            "LIBELLE": "Tajine Marocain",
            "QUANTITE": 1,
            "TOTAL" : 23.50,
            "LIEU" : "Villeurbanne",
            "LIBELLE_CONSO":"Sur place",
            "CODE_CONSO":"SURPLACE",
            "IMAGE_ANNONCE":"http://www.boucherie-grandmaire.com/images/plats1.jpg"
        },
        {
            "IDRESERV": 1,
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

    function getReservationsByUtilisateur(IdUtilisateur){
        var deferred = $q.defer();
        $http.get('/api/getReservationsByUser?id='+IdUtilisateur).
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

