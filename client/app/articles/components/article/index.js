import {ArticleComponentController} from './controller.js';

export default {
    pathPrefix: 'articles/',
    controller: ArticleComponentController,
    controllerAs: 'article',
    scope: {
        params: '=',
        articleTitle: '@'
    }
}
