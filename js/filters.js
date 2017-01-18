/**
 * Created by Nad on 05/01/2017.
 */
angular.module('CookIn')

.filter('parseDate', function() {
    return function(input) {
        return new Date(input);
    };
})

.filter('JsonIsEmpty', [function() {
    return function(object) {
        return object === undefined || angular.equals({}, object)|| angular.equals([], object);
    }
}]);