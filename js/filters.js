/**
 * Created by Nad on 05/01/2017.
 */
angular.module('CookIn')

.filter('JsonIsEmpty', [function() {
    return function(object) {
        return object === undefined || angular.equals({}, object)|| angular.equals([], object);
    }
}]);