import app from './app.js';

app.config(($stateProvider, $urlRouterProvider, $locationProvider)=> {
    $locationProvider
        .html5Mode(true)
        .hashPrefix('');

    $urlRouterProvider.when('', '/').otherwise(() => '/');

    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: './main/main.html',
            controller: 'main.IndexController',
            controllerAs: 'main'
        })
        .state('app.cabinet', {
            url: 'cabinet/',
            templateUrl: './cabinet/cabinet.html',
            controller: 'cabinet.IndexController',
            controllerAs: 'cabinet'
        });
});
