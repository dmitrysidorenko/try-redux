class ArticlesListComponentController {
    constructor({list, onSelect}) {
        this.list = list;
        this.onSelect = onSelect;
    }

    onParamChanged(param, newValue) {
        switch (param) {
            case 'list':
                this.list = newValue;
                break;
            case 'onSelect':
                this.onSelect = newValue;
                break;
        }
    }
}

ArticlesListComponentController.$inject = ['params'];

export {ArticlesListComponentController}
