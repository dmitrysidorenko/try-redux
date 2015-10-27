import * as ArticlesActions from './actions.js';

class ReadController {
    constructor($ngRedux, $scope, $state) {
        let unsubscribe = $ngRedux.connect(this.mapStateToThis, ArticlesActions)(this);
        $scope.$on('$destroy', unsubscribe);

        this.getArticle($state.params.id);
    }

    mapStateToThis(state) {
        return {
            article: state.articles.fullArticle,
            error: state.articles.fullArticleError
        };
    }

    onWordSelected(word) {
        console.log('selected word', word);
    }

}

ReadController.$inject = ['$ngRedux', '$scope', '$state'];

export {ReadController}
