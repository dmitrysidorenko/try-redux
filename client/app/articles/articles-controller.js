import * as ArticlesActions from './actions.js';

class ArticlesController {
    constructor($ngRedux, $scope) {
        let unsubscribe = $ngRedux.connect(this.mapStateToThis, ArticlesActions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.loadArticles();
    }

    mapStateToThis(state) {
        return {
            list: state.articles.list
        };
    }

}

ArticlesController.$inject = ['$ngRedux', '$scope'];

export {ArticlesController}
