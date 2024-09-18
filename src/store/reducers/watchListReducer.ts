import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, SET_WATCHLIST } from "../actions/actionTypes"
import { Movie, TVShow } from "../../types/media"


interface WatchListState {
  items: Array<Movie | TVShow>;
}

const initialState:WatchListState = {
  items: [],
}

const watchListReducer = (state = initialState, action:any)=>{
  switch(action.type){
    case SET_WATCHLIST:
      return {...state, items: action.payload};    
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default watchListReducer