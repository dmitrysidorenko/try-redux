import {extendComponent} from '../core/component.js';
import loadingDirective from './directives/spinner.js';
import mainMenu from './components/main-menu/index.js';
import menuItem from './components/menu-item/index.js';
import {MainController} from './main-controller.js';
import {addReducer} from '../reducers.js';
import reducer from './reducer.js';
require('./index.less');

addReducer('main', reducer);

export default extendComponent(angular.module('main', []))
    .controller('main.IndexController', MainController)
    .component('main-menu', mainMenu)
    .component('menu-item', menuItem)
    .directive('spinner', loadingDirective);
