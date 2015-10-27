import * as ArticlesActions from './actions.js';

class ArticlesController {
    constructor($ngRedux, $scope, $state) {
        let unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), ArticlesActions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.loadArticles();
        this.$state = $state;
        this.isLoading = true;
    }

    onArticleSelect(article) {
        this.$state.go('app.read', {id: article.id});
        console.log('article', article);
    }

    mapStateToThis(state) {
        this.isLoading = false;
        return {
            list: state.articles.list
        };
    }
}

ArticlesController.$inject = ['$ngRedux', '$scope', '$state'];

export {ArticlesController}
