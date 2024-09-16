import { Genre } from "../../types/media";
import {
  FETCH_GENRES_TV_REQUEST,
  FETCH_GENRES_TV_SUCCESS,
  FETCH_GENRES_TV_FAILURE,
  GenreTvActionTypes,
} from "../actions/actionTypes";

interface GenreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenreState = {
  genres: [],
  loading: false,
  error: null,
};

const genresTvReducer = (
  state = initialState,
  action: GenreTvActionTypes
): GenreState => {
  switch (action.type) {
    case FETCH_GENRES_TV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GENRES_TV_SUCCESS:
      return {
        ...state,
        genres: action.payload,
        loading: false,
      };
    case FETCH_GENRES_TV_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default genresTvReducer;
