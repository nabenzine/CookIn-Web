/**
 * Created by Nad on 05/01/2017.
 */
angular.module('CookIn')

.directive('datepickerValidationFix', function () {
    return {
        restrict: 'A',
        require: 'mdDatepicker',
        link: function (scope, element, attrs, mdDatepickerCtrl) {
            // Fix to run validation when a datepicker's minDate changes
            // Bug #5938
            mdDatepickerCtrl.$scope.$watch(function () { return mdDatepickerCtrl.minDate; }, function () {
                if (mdDatepickerCtrl.dateUtil.isValidDate(mdDatepickerCtrl.date)) {
                    mdDatepickerCtrl.updateErrorState.call(mdDatepickerCtrl);
                }
            });

            // Fix to clear error state when setting date programatically from null
            // Bug #6086
            mdDatepickerCtrl.$scope.$watch(function () { return mdDatepickerCtrl.date; }, function (newVal, oldVal) {
                mdDatepickerCtrl.updateErrorState.call(mdDatepickerCtrl);
            });
        }
    };
})
.directive('starRating', function() {
        return {
            restrict : 'A',
            template : '<ul class="rating">'
            + ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '  <i class="fa fa-star"></i>'
            + ' </li>'
            + '</ul>',
            scope : {
                ratingValue : '=',
                max : '=',
                onRatingSelected : '&'
            },
            link : function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    for ( var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled : i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function(index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating : index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function(oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
)
.directive('icheck', function($timeout, $parse) {
    return {
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox hover',
                    radioClass: 'icheckbox iradio hover'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
});