import * as DashboardActions from '../actions.js'
import cuid from 'cuid';

class DashboardController {
    constructor($ngRedux, $scope) {
        let unsubscribe = $ngRedux.connect(this.mapStateToThis, DashboardActions)(this);
        $scope.$on('$destroy',unsubscribe);
    }

    mapStateToThis(state) {
        return {
            widgets: state.widgets
        };
    }

    addNewWidget() {
        var id = cuid();
        var widget = {
            id: id,
            name: 'Widget ' + id,
            component: 'main-menu',
            params: [
                {
                    href: '/foo',
                    text: 'bar'
                }
            ]
        };
        this.addWidget(widget);
    }
}

export {DashboardController}
