class ArticleComponentController {
    constructor(article) {
        this.article = article;
    }

    onParamsChanged(article) {
        this.article = article;
    }
}

ArticleComponentController.$inject = [
    'params'
];

export {ArticleComponentController}
