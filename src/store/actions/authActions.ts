import { Dispatch } from "redux";
import CryptoJS from "crypto-js";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UserData,
} from "./actionTypes";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/storageUtils";

const CACHE_KEY = "userData";
const SECRET_KEY = "secret_key_14252";

export const register =
  (name: string, email: string, password: string) => (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        SECRET_KEY
      ).toString();
      const newUser: UserData = {
        name,
        email,
        password: encryptedPassword,
        isAuthenticated: true,
      };
      setToLocalStorage(CACHE_KEY, JSON.stringify(newUser));

      dispatch({ type: REGISTER_SUCCESS, payload: newUser });
    } catch (error: any) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
  };

export const login =
  (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const storedUser = getFromLocalStorage(CACHE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const decryptedPassword = CryptoJS.AES.decrypt(
          user.password,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if (email === user.email && password === decryptedPassword) {
          user.isAuthenticated = true;
          setToLocalStorage(CACHE_KEY, JSON.stringify(user));
          dispatch({
            type: LOGIN_SUCCESS,
            payload: user,
          });
        } else {
          throw new Error("Incorect email or password");
        }
      }else{
        throw new Error("Incorrect email or password");
      }
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

export const restoreAuth = () => (dispatch: Dispatch) => {
  const cacheUser = getFromLocalStorage(CACHE_KEY);

  if (cacheUser) {
    const user = JSON.parse(cacheUser);
    if (user.isAuthenticated) {
      dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(cacheUser) });
    }
  }
};

export const logout = () => (dispatch: Dispatch) => {
  const cacheUser = getFromLocalStorage(CACHE_KEY);
  if(cacheUser){
    const user = JSON.parse(cacheUser);
    user.isAuthenticated = false;
    setToLocalStorage(CACHE_KEY, JSON.stringify(user));
  }
  dispatch({ type: LOGOUT });
};
