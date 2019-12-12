import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';
import posts from './data/posts';
import comments from './data/comments';


const defaultState = {
    posts, 
    comments
};

const enhancers = compose (
    window.devToolsExtention ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState);
export const history = syncHistoryWithStore(browserHistory, store, enhancers);

if(module.hot) {
    module.hot.accept('./reducers/',() => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}
 
export default store;