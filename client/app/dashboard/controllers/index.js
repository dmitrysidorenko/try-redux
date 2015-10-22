import * as DashboardActions from '../actions.js'
import cuid from 'cuid';

class DashboardController {
    constructor($ngRedux, $scope, $timeout) {
        let unsubscribe = $ngRedux.connect(this.mapStateToThis, DashboardActions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.$timeout = $timeout;
        this.items = [{href: '/asd', text: 'a'}];

        $timeout(()=> {
            this.items = this.items.concat([{text: 'b'}]);
        }, 1000)
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
