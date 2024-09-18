import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  FETCH_TV_DETAILS_FAILURE,
  FETCH_TV_DETAILS_REQUEST,
  FETCH_TV_DETAILS_SUCCESS,
  TvDetailsActionTypes,
} from "./actionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../helpers/apiConstants";

export const fetchTvDetails =
  (
    mediaId: number
  ): ThunkAction<void, RootState, unknown, TvDetailsActionTypes> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_TV_DETAILS_REQUEST });
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/tv/${mediaId}`, {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: "credits,videos,reviews,recommendations",
        },
      });
      const tvDetails = response.data;
      dispatch({
        type: FETCH_TV_DETAILS_SUCCESS,
        payload: tvDetails,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TV_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
