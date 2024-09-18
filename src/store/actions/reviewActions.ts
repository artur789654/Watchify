import { collection, addDoc, getDocs, query, where  } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../firebase/firebase";
import {
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
} from "./actionTypes";

export const addReview =
  (movieId: string, userId: string, displayName: string, content: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_REVIEW_REQUEST });

      const reviewsCollection = collection(db, "reviews");
      await addDoc(reviewsCollection, {
        movieId,
        userId,
        displayName,
        content,
        createdAt: new Date(),
      });

      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: { movieId, userId, displayName, content },
      });
    } catch (error: any) {
      console.error("Error adding review:", error.message);
      dispatch({
        type: ADD_REVIEW_FAILURE,
        payload: error.message,
      });
    }
  };

  export const fetchReviews = (movieId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FETCH_REVIEWS_REQUEST });
      
      const reviewsCollection = collection(db, "reviews");
      const q = query(reviewsCollection, where("movieId", "==", movieId));
      const querySnapshot = await getDocs(q);
  
      const reviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      dispatch({
        type: FETCH_REVIEWS_SUCCESS,
        payload: reviews,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_REVIEWS_FAILURE,
        payload: error.message,
      });
    }
  };