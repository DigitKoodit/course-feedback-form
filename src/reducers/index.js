import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import course from './courseReducer';
import ui from './uiReducer';

const rootReducer = combineReducers(
  {
    auth,
    course,
    ui,
    routing: routerReducer
  }
);

export default rootReducer;
