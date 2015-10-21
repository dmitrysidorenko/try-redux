import app from './app.js';

app.config(($stateProvider, $urlRouterProvider, $locationProvider)=> {
    $locationProvider
        .html5Mode(true)
        .hashPrefix('');

    $urlRouterProvider.when('', '/').otherwise(() => '/');

    $stateProvider.state('app', {
        url: '/',
        templateUrl: './dashboard/index.html',
        controller: 'dashboardCtrl',
        controllerAs: 'dashboard'
    });
});
