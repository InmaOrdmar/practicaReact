import { CHANGE_USER, CHANGE_PASSWORD } from '../../actionTypes';

const initialState = {
    user: '',
    password: ''
}

const loginFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user: action.payload
            }
        case CHANGE_PASSWORD: 
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }
}

export default loginFormReducer;