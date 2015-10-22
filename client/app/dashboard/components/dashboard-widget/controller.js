class DashboardWidgetController {
    constructor(params, widgets) {
        this.widgets = widgets;
        this.name = params.name;
        this.componentName = params.component;
        this.componentParams = params.params;
        this.widgetId = params.widgetId;
    }

    remove() {
        this.widgets.removeWidget(this.widgetId);
    }
}

export {DashboardWidgetController}
