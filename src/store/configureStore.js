import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    )

    return store;
}

export default configureStore