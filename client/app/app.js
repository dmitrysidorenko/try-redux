import 'angular';
import 'angular-ui-router';
import './core/imports.js';
import {extendComponent} from './core/component.js';
import dashboard from './dashboard/index.js';
import main from './main/index.js';
import cabinet from './cabinet/index.js';
import articles from './articles/index.js';
import {getReducers} from './reducers';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ngRedux from 'ng-redux';

export default extendComponent(angular.module('app', [
    'ui.router',
    'component-loader',
    'dashboard',
    'main',
    'cabinet',
    'articles',
    ngRedux
]))
    .config(($ngReduxProvider)=> {
        let reducer = combineReducers(getReducers());
        $ngReduxProvider.createStoreWith(reducer, [thunk]);
    });
