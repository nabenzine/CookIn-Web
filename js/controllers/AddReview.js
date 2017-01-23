/**
 * Created by Nad on 04/01/2017.
 */
angular.module('CookIn').controller('AddReviewCtrl',AddReviewFnt);

AddReviewFnt.$inject=['$scope','$rootScope', '$mdDialog']

function AddReviewFnt($scope, $rootScope, $mdDialog ) {


    $scope.getAvisData = function(titre, commentaire) {
        $mdDialog.hide({note: 1, titre: titre, commentaire: commentaire});
    };

};

