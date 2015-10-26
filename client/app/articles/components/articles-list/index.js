import {ArticlesListComponentController} from './controller.js';

export default {
    pathPrefix: 'articles/',
    controller: ['params', ArticlesListComponentController],
    controllerAs: 'articlesList'
}
