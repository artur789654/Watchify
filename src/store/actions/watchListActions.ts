import { Dispatch } from "redux";
import { db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, SET_WATCHLIST } from "./actionTypes";
export const addToWatchList =
  (userId: string, media: any) => async (dispatch: Dispatch) => {
    try {
      const docRef = doc(db, "watchList", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await setDoc(docRef, {
          items: [...docSnap.data().items, media],
        });
      } else {
        await setDoc(docRef, {
          items: [media],
        });
      }
      dispatch({ type: ADD_TO_WATCHLIST, payload: media });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  export const removeFromWatchList =
  (userId: string, media: any) => async (dispatch: Dispatch) => {
    try {
      const docRef = doc(db, "watchList", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedItems = docSnap
          .data()
          .items.filter((item: any) => item.id !== media.id);
        await setDoc(docRef, { items: updatedItems });
        dispatch({ type: REMOVE_FROM_WATCHLIST, payload: media });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

 export const fetchWatchList = (userId:string)=>async(dispatch:Dispatch)=>{
  try{
    const docRef = doc(db, 'watchList', userId);
    const docSnap =await getDoc(docRef);

    let items = []
    if(docSnap.exists()){
      items = docSnap.data().items;
    }
    dispatch({type: SET_WATCHLIST, payload: items})
    return items;
  }catch(error:any){
    console.error(error.message);
    return [];
  }
 } 
