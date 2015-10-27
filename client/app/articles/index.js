import {extendComponent} from '../core/component.js';
import {ArticlesController} from './articles-controller.js';
import {ReadController} from './read-controller.js';
import {addReducer} from '../reducers.js';
import reducer from './reducer.js';
import articlesListComponent from './components/articles-list/index.js';
import articleComponent from './components/article/index.js';
import articleReaderComponent from './components/article-reader/index.js';
require('./articles.less');

addReducer('articles', reducer);

export default
extendComponent(angular.module('articles', []))
    .component('articles-list', articlesListComponent)
    .component('article', articleComponent)
    .component('article-reader', articleReaderComponent)
    .controller('articles.IndexController', ArticlesController)
    .controller('articles.ReadController', ReadController)
    .config(($stateProvider)=> {
        $stateProvider
            .state('app.articles', {
                url: 'articles/',
                templateUrl: './articles/articles.html',
                controller: 'articles.IndexController',
                controllerAs: 'articles'
            })
            .state('app.read', {
                url: 'articles/:id',
                templateUrl: './articles/read.html',
                controller: 'articles.ReadController',
                controllerAs: 'read'
            });
    });
