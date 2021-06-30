import { useReducer } from "react";
import { AuthContext } from "./_Contexts";
import { AUTH_ACTION } from "./Actions";
import { Iauth } from "../helpers/Interfaces";
function AuthProvider(props: any) {
  const initialState = {
    isAuth: false,
    username: null,
    type: null,
    token: null,
  };

  const reducer = (state: Iauth, action: any) => {
    switch (action.type) {
      case AUTH_ACTION.SIGN_IN:
        return {
          isAuth: true,
          username: action.payload.username,
          type: action.payload.type,
          token: action.payload.token,
        };
      case AUTH_ACTION.SIGN_OUT:
        return {
          isAuth: initialState.isAuth,
          username: initialState.username,
          type: initialState.type,
          token: initialState.token,
        };      
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<any>(reducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
