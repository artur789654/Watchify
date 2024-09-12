import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { FETCH_TV_FAILURE, FETCH_TV_REQUEST, FETCH_TV_SUCCESS, TvActionTypes } from "./actionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import { API_TIMEOUT, TMDB_API_KEY, TMDB_BASE_URL, TV_ENDPOINT } from "../../helpers/apiConstants";


export const fetchTv =(
  page: number = 1,
  sortBy: string = 'popularity.desc',
  startDate?: string,
  endDate?: string,
  genreId?: number
):ThunkAction<void, RootState, unknown, TvActionTypes> => async (dispatch:Dispatch)=>{
  dispatch({type:FETCH_TV_REQUEST});
  try{
    const response = await axios.get(`${TMDB_BASE_URL}${TV_ENDPOINT}`,{
      params:{
        api_key: TMDB_API_KEY,
        page,
        sort_by: sortBy,
        'first_air_date.gte': startDate || undefined,
        'first_air_date.lte': endDate || undefined,
        with_genres: genreId || undefined,
        include_adult: false,
        include_video: false,
      },
      timeout: API_TIMEOUT,
    });

    const movies = response.data.results;
    const totalPages= response.data.total_pages;
    dispatch({type:FETCH_TV_SUCCESS, payload:{ media:movies, totalPages}});
  }catch(error:any){
    dispatch({type:FETCH_TV_FAILURE, payload:error.message});
  }
}