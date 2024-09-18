import { Movie } from "../../types/media";
import { FETCH_MOVIE_DETAILS_FAILURE, FETCH_MOVIE_DETAILS_REQUEST, FETCH_MOVIE_DETAILS_SUCCESS, MovieDetailsActionTypes } from "../actions/actionTypes";


interface MovieDetailsState {
  loading: boolean;
  movie: Movie | null;
  error: string | null;
}

const initialState: MovieDetailsState = {
  loading: false,
  movie: null,
  error: null,
};

const movieDetailsReducer = (
  state = initialState, 
  action: MovieDetailsActionTypes
): MovieDetailsState => {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  
      };
      
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.payload,  
        error: null,
      };

    case FETCH_MOVIE_DETAILS_FAILURE:
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

export default movieDetailsReducer;
