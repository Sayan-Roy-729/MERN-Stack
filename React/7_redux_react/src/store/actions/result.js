import * as actionsType from './actionTypes';

export const saveResult = ( res ) => {
    // const updatedResult = res * 2;
    return {
        type: actionsType.STORE_RESULT,
        // result: updatedResult
        result: res
    };
}

// Asynchronous Code here
export const storeResult = (res) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            // const oldCounter = getState().ctr.counter;
            // console.log(oldCounter);
            dispatch(saveResult(res));
        }, 2000);
    };
};

export const deleteResult = (resElUd) => {
    return {
        type: actionsType.DELETE_RESULT,
        resultElId: resElUd
    };
};