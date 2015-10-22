import {DashboardWidgetController} from './controller.js';
require('./index.less');

export default {
    pathPrefix: 'dashboard/',
    controller: ['params', 'dashboard.widgets', DashboardWidgetController],
    controllerAs: 'dashboardWidget'
}

