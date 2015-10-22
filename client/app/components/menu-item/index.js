import {component} from '../../app.js';

class Controller{
    constructor($scope, params){
        $scope.item = params;
    }

    onParamsChanged(newItems){
        debugger;
    }
}

component('menu-item', {
    controller: Controller});
