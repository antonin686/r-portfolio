import { useReducer } from "react";
import { AuthContext } from "./_Contexts";
import { AUTH_ACTION } from "./Actions";
import { Iauth } from "../helpers/Interfaces";

function AuthProvider(props: any) {
  const initialState = {
    isAuth: false,
    username: "",
    type: "",
  };

  const reducer = (state: Iauth, action: any) => {
    switch (action.type) {
      case AUTH_ACTION.SIGN_IN:
        return {
          isAuth: true,
          username: action.payload.username,
          type: action.payload.type,
        };
      case AUTH_ACTION.SIGN_OUT:
        return {
          isAuth: false,
          username: null,
          type: null,
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
