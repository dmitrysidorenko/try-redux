require('./index.less');

angular.module('dashboard')
    .component('dashboard-widget', {
        pathPrefix: 'dashboard/',
        controller: ($scope, params, $ngRedux) => {
            $scope.name = params.name;
            $scope.componentName = params.component;
            $scope.componentParams = params.params;
            $scope.remove = params.onRemove();
        }
    });
