import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import bookmarkReducer from './reducer/bookmark';
import newReducer from './reducer/newsReducer';
const middleware = [thunk];
const rootReducer = combineReducers({
  news: newReducer,
  bookmark: bookmarkReducer,
});

export const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middleware)),
);
