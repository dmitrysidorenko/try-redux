import {ArticleComponentController} from './controller.js';

export default {
    pathPrefix: 'articles/',
    controller: ['params', ArticleComponentController],
    controllerAs: 'article'
}
