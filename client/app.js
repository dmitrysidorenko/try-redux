import {module} from 'angular';
import 'angular-ui-router';
import extendComponent from './core/component.js';
import './main/index.js';

let app = module('app', [
    'ui.router',
    'main'
]);

extendComponent(app);

export default app;
