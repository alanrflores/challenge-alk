import { GET_OPERATION_REQUEST, GET_OPERATION_SUCCESS, GET_OPERATION_FAILURE, CLEAR_PAGE  } from './actions.js';

const initialState = {
    operation: [],
    loading: true,
    error: ""
};

const operationReducer = (state = initialState, action) => {
    if(action.type === GET_OPERATION_REQUEST){
        return {
            ...state,
            loading: true
        }
    };

    if(action.type === GET_OPERATION_SUCCESS){
        return {
            ...state,
            loading: false,
            operation: action.payload
        }
    };

    if(action.type === GET_OPERATION_FAILURE){
        return {
            ...state,
            loading: false,
            error: 'Error 404 not found'
        }
    };

    if(action.type === CLEAR_PAGE){
        return {
            ...state,
            operation: []
        }
    };

    return state;

}

export default operationReducer;