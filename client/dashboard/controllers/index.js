import dashboard from '../ngModule.js';
import * as DashboardActions from '../actions.js'

dashboard.controller('dashboardCtrl', ['$ngRedux', '$scope', DashboardController]);

function DashboardController($ngRedux, $scope) {
    this.mapStateToThis = function (state) {
        return {
            widgets: state.widgets
        };
    };

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, DashboardActions)(this);
    $scope.$on('$destroy', unsubscribe);
}
