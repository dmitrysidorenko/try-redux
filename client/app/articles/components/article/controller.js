class ArticleComponentController {
    constructor(article, componentParams) {
        this.article = article;
        this.articleTitle = componentParams.articleTitle
    }

    onParamsChanged(article) {
        this.article = article;
    }

    onParamChanged(paramName, newValue, oldValue){
        switch(paramName){
            case 'articleTitle':
                this.articleTitle = newValue;
        }
    }
}

ArticleComponentController.$inject = [
    'params',
    'componentParams'
];

export {ArticleComponentController}
