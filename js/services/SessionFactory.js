/**
 * Created by Nad on 17/01/2017.
 */
angular.module('CookIn').factory('SessionFactory', function($http, $q, myConfig, $filter) {
    // Might use a resource here that returns a JSON array

    var factory = {
        addSession : addSession,
        getAvailabilityByAnnonce: getAvailabilityByAnnonce,
        getBookedSessionByAnnonceAndUser: getBookedSessionByAnnonceAndUser,
        jsonAvailabilityToArray : jsonAvailabilityToArray
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//

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
            "QUANTITE_RESTANTE": 1
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
    ];

    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//


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


    function addSession(session) {
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/Session',session).
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


    function jsonAvailabilityToArray(data) {
        var groupedByDate = _.groupBy(data, function(item) {
            var dateMoment = 'key'+$filter('date')(item.DATE_DEBUT, "ddMMyyyy");
            return dateMoment;
        });
        return groupedByDate;
    }

    return factory;
});