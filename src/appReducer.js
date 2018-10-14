import { FETCH_USERS } from './actionTypes';
const initialState = [];

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return action.payload;
        default:
            return state;
    }
}

export default appReducer;