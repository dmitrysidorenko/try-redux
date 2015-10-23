import ActionTypes from './action-types.js';
import createReducer from '../core/create-reducer.js';

let initialState = {
    loaders: 0
};

export default createReducer(initialState, {
    [ActionTypes.ADD_LOADER](state) {
        return Object.assign({}, state, {
            loaders: state.loaders + 1
        });
    },
    [ActionTypes.REMOVE_LOADER](state) {
        return Object.assign({}, state, {
            loaders: state.loaders > 0 ? state.loaders - 1 : 0
        });
    }
})
