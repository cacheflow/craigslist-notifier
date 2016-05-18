import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';



export default function configureStore() {
  const store = createStore(rootReducer)
  return store
}
