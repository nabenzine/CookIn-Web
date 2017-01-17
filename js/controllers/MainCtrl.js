/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('MainCtrl',MainCtrlFnt);

MainCtrlFnt.$inject=['$scope', 'anchorSmoothScroll', '$mdDialog']

function MainCtrlFnt($scope, anchorSmoothScroll, $mdDialog) {

    $scope.scrollToElement = function (id) {
        anchorSmoothScroll.scrollTo(id);
    }
/*    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }*/
};
