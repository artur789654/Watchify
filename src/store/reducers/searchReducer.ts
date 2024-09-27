import { Movie, TVShow } from "../../types/media";
import {
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
} from "../actions/actionTypes";

interface SearchState {
  loading: boolean;
  results: (Movie | TVShow)[];
  totalPages: number;
  error: string | null;
}

const initialState: SearchState = {
  loading: false,
  results: [],
  totalPages: 0,
  error: null,
};

export const searchReducer = (
  state = initialState,
  action: any
): SearchState => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SEARCH_SUCCESS:
      return { ...state, loading: false, results: action.payload.results, totalPages: action.payload.totalPages };
    case FETCH_SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
