import { TVShow } from "../../types/media";
import { FETCH_TV_DETAILS_FAILURE, FETCH_TV_DETAILS_REQUEST, FETCH_TV_DETAILS_SUCCESS, TvDetailsActionTypes } from "../actions/actionTypes";


interface TvDetailsState {
  loading: boolean;
  movie: TVShow | null;
  error: string | null;
}

const initialState: TvDetailsState = {
  loading: false,
  movie: null,
  error: null,
};

const TvDetailsReducer = (
  state = initialState, 
  action: TvDetailsActionTypes
): TvDetailsState => {
  switch (action.type) {
    case FETCH_TV_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  
      };
      
    case FETCH_TV_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.payload,  
        error: null,
      };

    case FETCH_TV_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        movie: null,
      };

    default:
      return state;
  }
};

export default TvDetailsReducer;
