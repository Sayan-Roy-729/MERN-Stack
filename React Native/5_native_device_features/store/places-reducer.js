import { ADD_PLACE, SET_PLACES } from './places-action';
import Place from '../models/place';

const initialState = {
    places: [],
};

const placeReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image
            );
            return {
                places: state.places.concat(newPlace),
            };
        case SET_PLACES:
            return {
                places: action.places.map(
                    (pl) => new Place(pl.id.toString(), pl.title, pl.imageUrl)
                ),
            };
        default:
            return state;
    }
    return state;
};

export default placeReducers;
