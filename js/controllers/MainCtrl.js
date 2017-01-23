/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('MainCtrl',MainCtrlFnt);

MainCtrlFnt.$inject=['$scope', 'Auth', 'anchorSmoothScroll', '$mdDialog']

function MainCtrlFnt($scope, Auth, anchorSmoothScroll, $mdDialog) {

    $scope.scrollToElement = function (id) {
        anchorSmoothScroll.scrollTo(id);
    };

    $scope.logout = function () {
        Auth.logout();
    }

};
