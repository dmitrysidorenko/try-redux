import ActionTypes from './action-types.js';
import createReducer from '../core/create-reducer.js';

export default createReducer([], {
    [ActionTypes.ADD_WIDGET](state, {widget}) {
        return [...state, widget];
    },
    [ActionTypes.REMOVE_WIDGET](state, {widgetId}) {
        return state.filter(w => w.id !== widgetId);
    }
})
