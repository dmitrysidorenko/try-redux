import {MainMenuController} from './controller.js';
require('./index.less');

export default {
    pathPrefix: 'main/',
    controller: ['params', MainMenuController],
    controllerAs: 'mainMenu'
}
