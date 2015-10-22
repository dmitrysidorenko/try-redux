import 'angular';
import 'angular-ui-router';
import './core/imports.js';
import {extendComponent} from './core/component.js';
import dashboard from './dashboard/main.js';

import {getReducers} from './reducers';
import { combineReducers } from 'redux';
import ngRedux from 'ng-redux';

export default extendComponent(angular.module('app', [
    'ui.router',
    'component-loader',
    'dashboard',
    ngRedux
]))
    .config(($ngReduxProvider)=> {
        let reducer = combineReducers(getReducers());
        $ngReduxProvider.createStoreWith(reducer, []);
    });
