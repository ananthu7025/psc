import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import {api} from '../../api/index';
const rootReducer = combineReducers({
  loginReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
