import { Movie, TVShow } from "../../types/media";

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
  payload: Movie;
}
interface FetchBannerMovieFailureAction {
  type: typeof FETCH_BANNER_MOVIE_FAILURE;
  payload: string;
}

export type bannerActionsTypes =
  | FetchBannerMovieRequestAction
  | FetchBannerMovieSuccessAction
  | FetchBannerMovieFailureAction;

export const FETCH_POPULAR_MOVIES_REQUEST = "FETCH_POPULAR_MOVIES_REQUEST";
export const FETCH_POPULAR_MOVIES_SUCCESS = "FETCH_POPULAR_MOVIES_SUCCESS";
export const FETCH_POPULAR_MOVIES_FAILURE = "FETCH_POPULAR_MOVIES_FAILURE";

export interface FetchPopularMoviesRequest {
  type: typeof FETCH_POPULAR_MOVIES_REQUEST;
}

export interface FetchPopularMoviesSuccess {
  type: typeof FETCH_POPULAR_MOVIES_SUCCESS;
  payload: Movie[];
}

export interface FetchPopularMoviesFailure {
  type: typeof FETCH_POPULAR_MOVIES_FAILURE;
  payload: string;
}

export type PopularMoviesActionTypes =
  | FetchPopularMoviesRequest
  | FetchPopularMoviesSuccess
  | FetchPopularMoviesFailure;

export const FETCH_TOP_RATED_MOVIES_REQUEST = "FETCH_TOP_RATED_MOVIES_REQUEST";
export const FETCH_TOP_RATED_MOVIES_SUCCESS = "FETCH_TOP_RATED_MOVIES_SUCCESS";
export const FETCH_TOP_RATED_MOVIES_FAILURE = "FETCH_TOP_RATED_MOVIES_FAILURE";

export interface FetchTopRatedMoviesRequest {
  type: typeof FETCH_TOP_RATED_MOVIES_REQUEST;
}

export interface FetchTopRatedMoviesSuccess {
  type: typeof FETCH_TOP_RATED_MOVIES_SUCCESS;
  payload: Movie[];
}

export interface FetchTopRatedMoviesFailure {
  type: typeof FETCH_TOP_RATED_MOVIES_FAILURE;
  payload: string;
}

export type TopRatedMoviesActionsTypes =
  | FetchTopRatedMoviesRequest
  | FetchTopRatedMoviesSuccess
  | FetchTopRatedMoviesFailure;

export const FETCH_UPCOMING_MOVIES_REQUEST = "FETCH_UPCOMING_MOVIES_REQUEST";
export const FETCH_UPCOMING_MOVIES_SUCCESS = "FETCH_UPCOMING_MOVIES_SUCCESS";
export const FETCH_UPCOMING_MOVIES_FAILURE = "FETCH_UPCOMING_MOVIES_FAILURE";

export interface FetchUpcomingMoviesRequest {
  type: typeof FETCH_UPCOMING_MOVIES_REQUEST;
}

export interface FetchUpcomingMoviesSuccess {
  type: typeof FETCH_UPCOMING_MOVIES_SUCCESS;
  payload: Movie[];
}

export interface FetchUpcomingMoviesFailure {
  type: typeof FETCH_UPCOMING_MOVIES_FAILURE;
  payload: string;
}

export type UpcomingMoviesActionsTypes =
  | FetchUpcomingMoviesRequest
  | FetchUpcomingMoviesSuccess
  | FetchUpcomingMoviesFailure;

export const FETCH_TOP_RATED_TV_SHOW_REQUEST =
  "FETCH_TOP_RATED_TV_SHOW_REQUEST";
export const FETCH_TOP_RATED_TV_SHOW_SUCCESS =
  "FETCH_TOP_RATED_TV_SHOW_SUCCESS";
export const FETCH_TOP_RATED_TV_SHOW_FAILURE =
  "FETCH_TOP_RATED_TV_SHOW_FAILURE";

export interface FetchTopRatedTvShowRequest {
  type: typeof FETCH_TOP_RATED_TV_SHOW_REQUEST;
}

export interface FetchTopRatedTvShowSuccess {
  type: typeof FETCH_TOP_RATED_TV_SHOW_SUCCESS;
  payload: TVShow[];
}

export interface FetchTopRatedTvShowFailure {
  type: typeof FETCH_TOP_RATED_TV_SHOW_FAILURE;
  payload: string;
}

export type TopRatedTvShowActionTypes =
  | FetchTopRatedTvShowRequest
  | FetchTopRatedTvShowSuccess
  | FetchTopRatedTvShowFailure;

export const FETCH_POPULAR_TV_SHOW_REQUEST = "FETCH_POPULAR_TV_SHOW_REQUEST";
export const FETCH_POPULAR_TV_SHOW_SUCCESS = "FETCH_POPULAR_TV_SHOW_SUCCESS";
export const FETCH_POPULAR_TV_SHOW_FAILURE = "FETCH_POPULAR_TV_SHOW_FAILURE";

export interface FetchPopularTvShowRequest {
  type: typeof FETCH_POPULAR_TV_SHOW_REQUEST;
}

export interface FetchPopularTvShowSuccess {
  type: typeof FETCH_POPULAR_TV_SHOW_SUCCESS;
  payload: TVShow[];
}

export interface FetchPopularTvShowFailure {
  type: typeof FETCH_POPULAR_TV_SHOW_FAILURE;
  payload: string;
}

export type PopularTvShowActionTypes =
  | FetchPopularTvShowRequest
  | FetchPopularTvShowSuccess
  | FetchPopularTvShowFailure;