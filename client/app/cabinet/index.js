import {extendComponent} from '../core/component.js';
import {CabinetController} from './cabinet-controller.js';

export default
    extendComponent(angular.module('cabinet', []))
    .controller('cabinet.IndexController', CabinetController);
