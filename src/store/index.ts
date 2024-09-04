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

const rootReducer = combineReducers({
  yourStateSlice: testReducer,
  banner: bannerReducer,
  popularMovies: popularMoviesReducer,
  topRatedMovies: topRatedMoviesReducer,
  upcomingMovies: upcomingMoviesReducer,
  popularTvShow: popularTvShowReducer,
  topRatedTvShow: topRatedTvShowReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
