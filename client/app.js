import {module} from 'angular';
import 'angular-ui-router';
import './core/imports.js';
import extendComponent from './core/component.js';
import './main/index.js';
import './dashboard/main.js';

import {getReducers} from './reducers';
import { combineReducers } from 'redux';
import ngRedux from 'ng-redux';


let app = module('app', [
    'ui.router',
    'component-loader',
    'main',
    'dashboard',
    ngRedux
]).config(($ngReduxProvider)=> {
    let reducer = combineReducers(getReducers());
    $ngReduxProvider.createStoreWith(reducer, []);
});

extendComponent(app);

export default app;
