import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as actionCreators from './actions';
import clientMiddleware from './clientMiddleware';

export default function configureStore(preloadedState = {}, apolloClient) {
  const DEV = process.env.NODE_ENV !== 'production';
  const middleware = [clientMiddleware(apolloClient), thunk];
  let composeEnhancers = compose;

  /* istanbul ignore else */
  if (process.env.BROWSER && DEV) {
    /* istanbul ignore next */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionCreators,
      });
    }
  }

  const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)));

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducers(require('./reducers').default);
    });
  }

  return store;
}
