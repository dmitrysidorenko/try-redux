import * as MainActions from './actions.js'

class MainController {
    constructor($ngRedux, $scope) {
        this.isLoading = false;

        let unsubscribe = $ngRedux.connect(this.mapStateToThis, MainActions)(this);
        $scope.$on('$destroy', unsubscribe);
    }

    mapStateToThis(state) {
        return {
            main: state.main,
            isLoading: state.main.loaders > 0
        };
    }
}

MainController.$inject = ['$ngRedux', '$scope'];

export {MainController}
