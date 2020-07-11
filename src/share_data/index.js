import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
 import rootReducer from "./reducers";

function configureStore(preloadedState) {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(
         rootReducer,
        preloadedState,
        composedEnhancer
    );

    return store;
}

export default configureStore;