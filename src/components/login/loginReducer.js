import { LOGIN, LOGOUT, LOGIN_ERROR } from '../../actionTypes';


const initialState = {
    loggedIn: false,
    activeUser: '',
    loginError: false
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                activeUser: action.payload,
                loginError: false
            }
        case LOGOUT: 
            return initialState;
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: true
            }
        default:
            return state;
    }
}

export default loginReducer;