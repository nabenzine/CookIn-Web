/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('AddReviewCtrl',AddReviewFnt);

AddReviewFnt.$inject=['$scope','$rootScope', '$mdDialog']

function AddReviewFnt($scope, $rootScope, $mdDialog ) {

    $scope.rateFunction = function(rating)
    {
        $scope.note = rating;
    }
    $scope.getAvisData = function(titre, commentaire) {
        $mdDialog.hide({note: $scope.note, titre: titre, commentaire: commentaire});
    };

};

