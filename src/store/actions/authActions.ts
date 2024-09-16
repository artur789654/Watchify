import { Dispatch } from "redux";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_PASSWORD_RESET_EMAIL_FAILURE,
  SEND_PASSWORD_RESET_EMAIL_REQUEST,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
} from "./actionTypes";

import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const register = (
  displayName: string,
  email: string,
  password: string,
  rememberMe: boolean
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName });
      dispatch({ type: REGISTER_SUCCESS, payload: userCredential.user });
    } catch (error: any) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
  };
};

export const login = (email: string, password: string, rememberMe: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      await signOut(auth);
      dispatch({ type: LOGOUT });
    } catch (error: any) {
      console.error("Logout failed", error);
    }
  };
};

export const restoreAuth = () => {
  return (dispatch: Dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      }
    });
  };
};

export const sendPasswordResetEmail = (email: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SEND_PASSWORD_RESET_EMAIL_REQUEST });
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      dispatch({ type: SEND_PASSWORD_RESET_EMAIL_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: SEND_PASSWORD_RESET_EMAIL_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const resetPassword = (oobCode: string, newPassword: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (error: any) {
      dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
    }
  };
};
