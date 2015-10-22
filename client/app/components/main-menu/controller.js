class MainMenuController {
    constructor(params) {
        this.items = params;
    }

    onParamsChanged(newParams) {
        console.log('Params has changed!', params, newParams);
        this.items = newParams;
    }
}

export {MainMenuController}
