import {
  FETCH_BANNER_MOVIE_REQUEST,
  FETCH_BANNER_MOVIE_SUCCESS,
  FETCH_BANNER_MOVIE_FAILURE,
  bannerActionsTypes,
} from "../actions/actionTypes";

interface BannerState {
  loading: boolean;
  movie: any | null;
  error: string | null;
}

const initialState: BannerState = {
  loading: false,
  movie: null,
  error: null,
};

const bannerReducer = (
  state = initialState,
  action: bannerActionsTypes
): BannerState => {
  switch (action.type) {
    case FETCH_BANNER_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BANNER_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BANNER_MOVIE_FAILURE:
      return {
        ...state,
        movie: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bannerReducer;
