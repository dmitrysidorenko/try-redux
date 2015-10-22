import {removeWidget as removeWidgetAction} from '../actions.js';

class WidgetsService {
    constructor($ngRedux) {
        this._widgets = [];
        this.$ngRedux = $ngRedux;
    }

    removeWidget(widgetId) {
        this.$ngRedux.dispatch(removeWidgetAction(widgetId));
    }
}

export {WidgetsService};
