import app from '../../app.js';

app.component('main-menu', {
    controller: ($scope, params)=> {
        $scope.items = params;
    }
});
