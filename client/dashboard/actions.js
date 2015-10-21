import ActionTypes from './action-types.js';

export var addWidget = (widget)=> {
    return {
        type: ActionTypes.ADD_WIDGET,
        widget
    }
};

export var removeWidget = (widget)=> {
    return {
        type: ActionTypes.REMOVE_WIDGET,
        widget
    }
};
