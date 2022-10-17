import axios from 'axios';


export const GET_OPERATION_REQUEST = 'GET_OPERATION_REQUEST';
export const GET_OPERATION_SUCCESS = 'GET_OPERATION_SUCCESS';
export const GET_OPERATION_FAILURE = 'GET_OPERATION_FAILURE';
export const CLEAR_PAGE = 'CLEAR_PAGE';


export const getOperation = () => {
    return async(dispatch) => {
        dispatch(getOperationRequest());
      try {
        const res = await axios.get('http://localhost:3001/operation');
        dispatch(getOperationSuccess(res.data));
      } catch (error) {
        dispatch(getOperationFailure(error));
      }
    }
};

export const getOperationById = (id) => {
    return async(dispatch) => {
        dispatch(getOperationRequest());
        try {
         const res = await axios.get(`http://localhost:3001/operation/${id}`);
         dispatch(getOperationSuccess(res.data));
      } catch (error) {
         dispatch(getOperationFailure(error));
        }
    }
};

// export const createOperation = (value) => {
//     return async(dispatch) => {
//         dispatch(getOperationRequest());
//         try {
//             const res = await axios.post('http://localhost:3001/operation', value);
//             dispatch(getOperationSuccess())
            
//         } catch (error) {
//             dispatch(getOperationFailure(error));
//         }
//     }
// };

export const deleteOperation = (id) => {
    return async(dispatch, getState) => {
        //console.log(getState())
        dispatch(getOperationRequest());
        try {
            await axios.delete(`http://localhost:3001/operation/${id}`);
            const operations = getState().operationReducer.operation
            dispatch(getOperationSuccess(operations.filter((element)=> element.id !== id)))
        } catch (error) {
            dispatch(getOperationFailure());
        }
    }
};

export const updateOperation = (id, body) => {
    return async(dispatch, getState) => {
        console.log(getState())
        dispatch(getOperationRequest());
        try {
            await axios.put(`http://localhost:3001/operation/${id}`, body);
            const userId = getState().userReducer.user.id
            const getOperation = await axios.get(`http://localhost:3001/users/${userId}`)
             dispatch(getOperationSuccess(getOperation.data.operations));
        } catch (error) {
            dispatch(getOperationFailure(error));
        }
    }
};

export const filterOperation = (type, id) => {
    return async(dispatch) => {
       dispatch(getOperationRequest());
       try {
          const res = await axios.get(`http://localhost:3001/users/${id}`)
        //   const result = res.data.operations
          if(type){
            dispatch(getOperationSuccess(res.data.operations.filter((element)=> element.type === type)))
          }else{
            getOperationSuccess(res.data.operations);
          } 
       } catch (error) {
        dispatch(getOperationFailure(error));
       }
    }
}



export const getOperationRequest = () => {
    return {
        type: GET_OPERATION_REQUEST
    }
};

export const getOperationSuccess = (operation) => {
    return {
        type: GET_OPERATION_SUCCESS,
        payload: operation
    }
};

export const getOperationFailure = (error) => {
    return {
        type: GET_OPERATION_FAILURE,
        payload: error
    }
};

export const clearPage = () => {
    return {
        type: CLEAR_PAGE
    }
};