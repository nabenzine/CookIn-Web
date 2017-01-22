/**
 * Created by Nad on 17/01/2017.
 */
angular.module('CookIn').factory('ImageFactory', function($http,$q,myConfig) {
    // Might use a resource here that returns a JSON array

    var factory = {
        addImage : addImage
    };

    //*********************************************//
    //************** DEFAULTS DATA  **************//
    //*********************************************//


    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//


    function addImage(image) {
        var deferred = $q.defer();
        $http.post(myConfig.url + '/api/IMAGE_ANNONCE',image).
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