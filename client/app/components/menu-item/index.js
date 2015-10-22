import {component} from '../../app.js';

component('menu-item', {
    controller: ($scope, params)=> {
        $scope.item = params;
    }
});
