import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actions/actionTypes";

interface User{
  name:string,
  email:string,
  password:string,
  isAuthenticated?:boolean,
}

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const authReducer =(state = initialState, action:any):AuthState =>{
  switch(action.type){
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {...state, loading:true, error:null};
      
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {...state, loading: false, isAuthenticated:true, user:action.payload, error:null};
      
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:  
      return {...state, loading:false, error:action.payload};
    
    case LOGOUT:
      return {...state, isAuthenticated:false, user:null, error: null};  

    default:
      return state;  
  }
}