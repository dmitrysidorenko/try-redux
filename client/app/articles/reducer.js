import ActionTypes from './action-types.js';
import createReducer from '../core/create-reducer.js';

let initialState = {
    list: [],
    fullArticle: null,
    fullArticleError: null
};

export default createReducer(initialState, {
    [ActionTypes.LOAD_ARTICLES_REQUEST](state, action) {
        return state;
    },
    [ActionTypes.LOAD_ARTICLES_SUCCESS](state, {response}) {
        return Object.assign({}, {
            list: [...response]
        });
    },
    [ActionTypes.LOAD_ARTICLES_FAILURE](state, {error}) {
        return state;
    },

    [ActionTypes.GET_ARTICLE_REQUEST](state, {response}){
        return Object.assign({}, {
            fullArticle: null,
            fullArticleError: null
        });
    },
    [ActionTypes.GET_ARTICLE_SUCCESS](state, {response}){
        return Object.assign({}, {
            fullArticle: response,
            fullArticleError: null
        });
    },
    [ActionTypes.GET_ARTICLE_FAILURE](state, {error}){
        return Object.assign({}, {
            fullArticle: null,
            fullArticleError: error
        });
    }
})
