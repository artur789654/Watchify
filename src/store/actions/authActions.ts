import { Dispatch } from "redux";
import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
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
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
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
  updateEmail,
  updatePassword,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
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
      const {
        uid,
        email: userEmail,
        displayName: userDisplayName,
      } = userCredential.user;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { uid, email: userEmail, displayName: userDisplayName },
      });
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
      const {
        uid,
        email: userEmail,
        displayName: userDisplayName,
      } = userCredential.user;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { uid, email: userEmail, displayName: userDisplayName },
      });
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

export const updateUserProfile = (
  displayName: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
      const user = auth.currentUser;

      if (user) {
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);

        if (user.email !== email) {
          try {
            await sendEmailVerification(user);
            console.log("Verification email sent to new email. Please verify.");
          } catch (error) {
            console.error("Error sending verification email: ", error);
          }
            await updateEmail(user, email);
            console.log("Email updated successfully.");
        }

        if (user.displayName !== displayName) {
          await updateProfile(user, { displayName });
          console.log("Display name updated successfully.");
        }
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: { displayName, email },
        });
      }
    } catch (error: any) {
      console.error("Error updating profile: ", error);
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
  };
};

export const changeUserPassword = (newPassword: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
      const user = auth.currentUser;

      if (user) {
        await updatePassword(user, newPassword);
        dispatch({ type: CHANGE_PASSWORD_SUCCESS });
      }
    } catch (error: any) {
      dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error.message });
    }
  };
};
