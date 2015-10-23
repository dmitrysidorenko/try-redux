import ActionTypes from './action-types.js';

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

export var loadArticles = (filters = [])=> {
    return dispatch => {
        return dispatch(()=> {
            return new Promise((resolve, reject)=> {
                setTimeout(()=> {
                    resolve([{
                        title: 'How to be stupid',
                        text: 'It is easy then you might think. Just do nothing! That is it!'
                    }])
                }, 2000);
            });
        })
    }
};
