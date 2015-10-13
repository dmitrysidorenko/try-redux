import app from '../../app.js';
import '../../core/component-loader.js';
require('./index.less');

app.component('dashboard-widget', {
    controller: ($scope, params) => {
        $scope.name = params.name;
        $scope.componentName = params.component;
        $scope.componentParams = params.params;
    }
});
