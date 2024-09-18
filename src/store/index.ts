import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import testReducer from "./reducers/testReducer";
import bannerReducer from "./reducers/bannerReducer";
import popularMoviesReducer from "./reducers/popularMoviesReducer";
import topRatedMoviesReducer from "./reducers/topRatedMoviesReducer";
import upcomingMoviesReducer from "./reducers/upcomingMoviesReducer";
import popularTvShowReducer from "./reducers/popularTvShowReducer";
import topRatedTvShowReducer from "./reducers/topRatedTvShowReducer";
import { authReducer } from "./reducers/authReducer";
import watchListReducer from "./reducers/watchListReducer";
import movieReducer from "./reducers/movieReducer";
import tvReducer from "./reducers/tvReducer";
import genresTvReducer from "./reducers/genresTvReducer";
import genresMoviesReducer from "./reducers/genresMoviesReducer";
import movieDetailsReducer from "./reducers/movieDetailsReducer";
import TvDetailsReducer from "./reducers/tvDetailsReducer";
import { reviewReducer } from "./reducers/reviewReducer";

const rootReducer = combineReducers({
  yourStateSlice: testReducer,
  banner: bannerReducer,
  popularMovies: popularMoviesReducer,
  topRatedMovies: topRatedMoviesReducer,
  upcomingMovies: upcomingMoviesReducer,
  popularTvShow: popularTvShowReducer,
  topRatedTvShow: topRatedTvShowReducer,
  auth: authReducer,
  watchList: watchListReducer,
  movie: movieReducer,
  tv: tvReducer,
  genresMovies: genresMoviesReducer,
  genresTv: genresTvReducer,
  movieDetails: movieDetailsReducer,
  tvDetails: TvDetailsReducer,
  review: reviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
