import ActionTypes from './action-types.js';
import * as MainActions from '../main/actions.js';

let articles = [{
    id: 1,
    title: 'How to be stupid',
    text: 'It is much easier then you might think. Just do nothing! That is it!'
}];

function request() {
    return {
        type: ActionTypes.LOAD_ARTICLES_REQUEST
    }
}
function success(articles) {
    return {
        type: ActionTypes.LOAD_ARTICLES_SUCCESS,
        response: articles
    }
}
function failure(error) {
    return {
        type: ActionTypes.LOAD_ARTICLES_FAILURE,
        error
    }
}

function getArticleRequest() {
    return {
        type: ActionTypes.GET_ARTICLE_REQUEST,
        response: articles
    }
}
function getArticleSuccess(article) {
    return {
        type: ActionTypes.GET_ARTICLE_SUCCESS,
        response: article
    }
}
function getArticleFailure(error) {
    return {
        type: ActionTypes.GET_ARTICLE_FAILURE,
        error
    }
}


export let loadArticles = (filters = [])=> {
    return dispatch => {
        dispatch(MainActions.addLoader());

        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve([...articles])
            }, 2000);
        }).then(articles => {
                dispatch(MainActions.removeLoader());
                dispatch(success(articles))
            });
    }
};

export let getArticle = (id) => {
    return dispatch => {
        dispatch(MainActions.addLoader());
        dispatch(getArticleRequest());

        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                var article = articles.find((a)=> a.id === +id);
                if (article) {
                    resolve(Object.assign({}, article));
                } else {
                    reject({
                        status: 404,
                        statusText: 'Not found',
                        message: 'Article not found'
                    });
                }
            }, 2000);
        }).then(article => {
                dispatch(MainActions.removeLoader());
                dispatch(getArticleSuccess(article))
            }, error=> {
                dispatch(getArticleFailure(error))
            });
    }
};
