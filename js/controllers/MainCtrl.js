/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('MainCtrl',MainCtrlFnt);

MainCtrlFnt.$inject=['$scope', 'anchorSmoothScroll']

function MainCtrlFnt($scope, anchorSmoothScroll) {

    $scope.scrollToElement = function (id) {
        anchorSmoothScroll.scrollTo(id);
    }

};
