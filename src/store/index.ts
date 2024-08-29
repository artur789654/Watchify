import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import testReducer from "./reducers/testReducer";
import bannerReducer from "./reducers/bannerReducer";

const rootReducer = combineReducers({
  yourStateSlice: testReducer,
  banner: bannerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
