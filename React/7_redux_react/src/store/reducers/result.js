import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter((result, index) => result.id !== action.resultElId);
    return updatedArray;
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type){
        case actionTypes.STORE_RESULT:
            // Change data...
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)

            // const updatedArray = state.results.filter((result, index) => result.id !== action.resultElId);
            // return {
            //     ...state,
            //     results: updatedArray
            // }

            return deleteResult(state, action);
    
    }
    return state;
};

export default reducer;