import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, CLEAR_PAGE } from './actions.js';

const initialState = {
    user: [],
    loading: true,
    error: "" 

};

const userReducer = (state = initialState, action) => {
    if(action.type === GET_USER_REQUEST){
        return {
          ...state,
          loading: true
        }
    };

    if(action.type === GET_USER_SUCCESS){
        return {
            ...state,
            loading: false,
            user: action.payload,
        }
    };
    
    if(action.type === GET_USER_FAILURE){
        return {
            ...state,
            loading: false,
            error: 'Error 404 not found'
        }
    };

    if(action.type === CLEAR_PAGE){
        return {
           ...state,
           user: []
        }
    };

    return state;
};

export default userReducer;