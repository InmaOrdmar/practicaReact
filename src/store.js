import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './components/login/loginReducer';
import appReducer from './appReducer.js'

const rootReducer = combineReducers({
    loginData: loginReducer,
    users: appReducer
});

const initialState = {
  loginData: {
    loggedIn: false,
    activeUser: '',
    loginError: false
  },
  users: []
}

const enhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, initialState, enhance(applyMiddleware(thunk)));

export default store;