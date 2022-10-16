import axios from 'axios';
import { getOperation, getOperationSuccess } from '../operation/actions';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const CLEAR_PAGE = 'CLEAR_PAGE';

export const loginUser = (user) => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        try{
            dispatch(getUserSuccess(user))
        }catch(err){
            dispatch(getUserFailure(err)) 
        }
    }
}

export const checkUserState = () => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        try{
            let user = localStorage.getItem("user")

            if(user){
                dispatch(getUserSuccess(user))  
            }else{
                dispatch(getUserSuccess(false))
            }

        }catch(err){
            dispatch(getUserFailure(err)) 
        }
    }
};

export const getUser = () => {
    return async(dispatch) => {
        dispatch(getUserRequest());
        try {
           const res = await axios.get('http://localhost:3001/users')
           dispatch(getUserSuccess(res.data));
        } catch (error) {
            dispatch(getUserFailure(error));
        }
    }
};

export const getUserId = (id) => {
    return async(dispatch) => {
        dispatch(getUserRequest());
        try {
            const res = await axios.get(`http://localhost:3001/users/${id}`)
            dispatch(getUserSuccess(res.data))
            dispatch(getOperationSuccess(res.data.operations))
        } catch (error) {
            dispatch(getUserFailure(error))
        }
    }
};

export const createUser = (value) => {
    return async(dispatch) => {
        dispatch(getUserRequest());
        try {
            const res = await axios.post('http://localhost:3001/users', value)
            dispatch(getUserSuccess(res.data));
        } catch (error) {
            dispatch(getUserFailure(error));
        }
    }
};

export const deleteUser = (id) => {
    return async(dispatch) => {
        dispatch(getUserRequest());
        try {
            const res = await axios.delete(`http://localhost:3001/users/${id}`)
            dispatch(getUserSuccess(res.data));
        } catch (error) {
            dispatch(getUserFailure(error));
        }
    }
};

export const updateUser = (id, value) => {
    return async(dispatch) => {
        dispatch(getUserRequest());
        try {
            const res = await axios.put(`http://localhost:3001/users/${id}`, value)
            dispatch(getUserSuccess(res.data));
        } catch (error) {
            dispatch(getUserFailure(error));
        }
    }
};


export const clearPage = () => {
    return {
        type: CLEAR_PAGE
    }
};

export const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    }
};

export const getUserSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    }
};

export const getUserFailure = (error) => {
    return {
        type: GET_USER_FAILURE,
        payload: error
    }
};
