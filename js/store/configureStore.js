import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';
import {reducers} from '../reducers/reducers';
import {combineReducers} from 'redux';

const combined = combineReducers(reducers);

export default function configureStore() {
  const store = createStore(combined)
  return store
}
