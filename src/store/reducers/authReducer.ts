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
} from "../actions/actionTypes";

interface User {
  uid: string;
  displayName: string;
  email: string;
  password: string;
  isAuthenticated?: boolean;
}

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  success: false,
};
interface AuthAction {
  type: string;
  payload?: any;
}

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null, error: null };

    case SEND_PASSWORD_RESET_EMAIL_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };

    case SEND_PASSWORD_RESET_EMAIL_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true };

    case SEND_PASSWORD_RESET_EMAIL_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
