import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import Reducer from './reducers';

const logger = createLogger({
  collapsed: true,
  timestamp: false
});

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk);
  } else {
    return applyMiddleware(thunk, logger);
  }
};

export const store = createStore(Reducer, composeWithDevTools(getMiddleware()));