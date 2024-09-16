import { Genre } from "../../types/media";
import {
  FETCH_GENRES_MOVIES_REQUEST,
  FETCH_GENRES_MOVIES_SUCCESS,
  FETCH_GENRES_MOVIES_FAILURE,
  GenreMoviesActionTypes,
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

const genresMoviesReducer = (
  state = initialState,
  action: GenreMoviesActionTypes
): GenreState => {
  switch (action.type) {
    case FETCH_GENRES_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GENRES_MOVIES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
        loading: false,
      };
    case FETCH_GENRES_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default genresMoviesReducer;
