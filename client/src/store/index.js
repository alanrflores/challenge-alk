import { combineReducers } from 'redux';
import userReducer from './user/reducers'
import operationReducer from './operation/reducers'

export default combineReducers({
  operationReducer,
  userReducer
});

