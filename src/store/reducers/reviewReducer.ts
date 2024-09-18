import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  reviews: [],
  error: null,
};

export const reviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [...state.reviews, action.payload],
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case ADD_REVIEW_FAILURE:
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
