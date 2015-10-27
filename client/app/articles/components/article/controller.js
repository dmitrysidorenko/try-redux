class ArticleComponentController {
    constructor({article, title, onSelect}) {
        this.article = article;
        this.title = title;
        this.onSelect = onSelect;
    }

    onParamChanged(paramName, newValue, oldValue) {
        switch (paramName) {
            case 'article':
                this.article = newValue;
                break;
            case 'title':
                this.title = newValue;
                break;
            case 'onSelect':
                this.onSelect = newValue;
                break;
        }
    }

    onArticleSelected($event) {
        $event.preventDefault();

        this.onSelect({
            article: this.article
        });
    }
}

ArticleComponentController.$inject = [
    'params'
];

export {ArticleComponentController}
