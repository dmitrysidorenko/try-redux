import {extendComponent} from '../core/component.js';
import {ArticlesController} from './articles-controller.js';

export default
    extendComponent(angular.module('articles', []))
        .controller('articles.IndexController', ArticlesController)
        .config(($stateProvider)=> {
            $stateProvider.state('app.articles', {
                url: 'articles/',
                templateUrl: './articles/articles.html',
                controller: 'articles.IndexController',
                controllerAs: 'articles'
            });
        });
