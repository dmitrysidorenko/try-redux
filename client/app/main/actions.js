import ActionTypes from './action-types.js';

export var addLoader = ()=> {
    return {
        type: ActionTypes.ADD_LOADER
    }
};

export var removeLoader = ()=> {
    return {
        type: ActionTypes.REMOVE_LOADER
    }
};
