import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  SearchActionsType,
} from "./actionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
} from "../../helpers/apiConstants";
import { Movie, TVShow } from "../../types/media";

interface SearchResponse {
  results: (Movie | TVShow)[];
  total_pages: number; 
}

export const fetchSearch =
  (
    page: number = 1,
    query: string
  ): ThunkAction<void, RootState, unknown, SearchActionsType> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_SEARCH_REQUEST });
    try {
      const movieResponse = await axios.get<SearchResponse>(
        `${TMDB_BASE_URL}/search/movie`,
        {
          params: {
            api_key: TMDB_API_KEY,
            page,
            query,
          },
        }
      );
      const tvResponse = await axios.get<SearchResponse>(
        `${TMDB_BASE_URL}/search/tv`,
        {
          params: {
            api_key: TMDB_API_KEY,
            page,
            query,
          },
        }
      );
      const searchResults = [
        ...movieResponse.data.results,
        ...tvResponse.data.results,
      ];
      const totalPages = Math.max(
        movieResponse.data.total_pages,
        tvResponse.data.total_pages
      );
      dispatch({
        type: FETCH_SEARCH_SUCCESS,
        payload: { results: searchResults, totalPages },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_SEARCH_FAILURE,
        payload: error.message,
      });
    }
  };
