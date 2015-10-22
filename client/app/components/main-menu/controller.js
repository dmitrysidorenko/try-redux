class MainMenuController {
    constructor(params) {
        this.items = params;
    }

    onParamsChanged(newParams) {
        console.log('Params has changed!', this.items, newParams);
        this.items = newParams;
    }
}

export {MainMenuController}
