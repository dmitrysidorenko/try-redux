import {component} from '../../app.js';
import {MainMenuController} from './controller.js';
require('./index.less');

component('main-menu', {
    controller: ['params', MainMenuController],
    controllerAs: 'mainMenu'
});
