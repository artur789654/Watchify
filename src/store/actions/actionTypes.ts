export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_ERROR = "FETCH_MOVIES_ERROR";

export const FETCH_BANNER_MOVIE_REQUEST = "FETCH_BANNER_MOVIE_REQUEST";
export const FETCH_BANNER_MOVIE_SUCCESS = "FETCH_BANNER_MOVIE_SUCCESS";
export const FETCH_BANNER_MOVIE_FAILURE = "FETCH_BANNER_MOVIE_FAILURE";

interface FetchBannerMovieRequestAction {
  type: typeof FETCH_BANNER_MOVIE_REQUEST;
}
interface FetchBannerMovieSuccessAction {
  type: typeof FETCH_BANNER_MOVIE_SUCCESS;
  payload: any;
}
interface FetchBannerMovieFailureAction {
  type: typeof FETCH_BANNER_MOVIE_FAILURE;
  payload: string;
}

export type bannerActionsTypes =
  | FetchBannerMovieRequestAction
  | FetchBannerMovieSuccessAction
  | FetchBannerMovieFailureAction;
