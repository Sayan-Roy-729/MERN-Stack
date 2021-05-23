import { ADD_PLACE } from "./places-action";
import Place from '../models/place';

const initialState = {
    places: [],
};

const placeReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString(), action.placeData.title);
            return {
                places: state.places.concat(newPlace),
            };
        default:
            return state;
    }
    return state;
};

export default placeReducers;