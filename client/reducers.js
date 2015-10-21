var reducers = {};

export var addReducer = (name = '', reducer = (state, action)=>state)=> {
    reducers[name] = reducer;
};

export var getReducers = ()=> {
    return reducers;
};
