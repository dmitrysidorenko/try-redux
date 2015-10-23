import ActionTypes from './action-types.js';
import createReducer from '../core/create-reducer.js';

let initialState = {
    articles: [],
    filters: []
};

export default createReducer(initialState, {
    [ActionTypes.LOAD_ARTICLES_REQUEST](state, {filters}) {
        return Object.assign({}, state, {
            filters: filters
        });
    },
    [ActionTypes.LOAD_ARTICLES_SUCCESS](state, {response}) {
        return Object.assign({}, state, {
            articles: response
        });
    },
    [ActionTypes.LOAD_ARTICLES_FAILURE](state, {error}) {
        return Object.assign({}, state, {
            articles: articles
        });
    }
})
