class ArticlesListComponentController {
    constructor({list, onSelect}) {
        this.list = list;
        this.onSelect = onSelect;
    }

    onParamsChanged({list, onSelect}) {
        this.list = list;
        this.onSelect = onSelect;
    }
}

ArticlesListComponentController.$inject = ['params'];

export {ArticlesListComponentController}
