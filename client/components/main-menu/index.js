import {component} from '../../app.js';

component('main-menu', {
    controller: ($scope, params)=> {
        $scope.items = params;
    }
});
