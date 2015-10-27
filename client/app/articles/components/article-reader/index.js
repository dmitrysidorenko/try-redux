import {ArticleReaderComponentController} from './controller.js';
require('./index.less');

export default {
    pathPrefix: 'articles/',
    controller: ['params', ArticleReaderComponentController],
    controllerAs: 'articleReader',
    scope: {
        article: '=',
        onWordSelected: '&'
    }
}
