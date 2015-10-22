import {addReducer} from '../reducers.js';
import reducer from './reducer.js';
import {extendComponent} from '../core/component.js';
import {DashboardController} from './controllers/index.js';
import {WidgetsService} from './services/widgets.js';
import dashboardWidgetComponent from './components/dashboard-widget/index.js';

addReducer('widgets', reducer);

export default extendComponent(angular.module('dashboard', []))
    .controller('dashboardCtrl', ['$ngRedux', '$scope', '$timeout', DashboardController])
    .service('dashboard.widgets', ['$ngRedux', WidgetsService])
    .component('dashboard-widget', dashboardWidgetComponent);
