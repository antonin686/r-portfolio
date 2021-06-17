import { useReducer } from "react";
import { AuthContext } from "./_Contexts";
import { AUTH_ACTION } from "./Actions";
import { Iauth } from "../helpers/Interfaces";
import { sidebarInfoUrl } from "./../helpers/ApiLinks";
import {fetchGetRes} from "./../helpers/FormHelper";
function AuthProvider(props: any) {
  const initialState = {
    isAuth: false,
    username: "",
    type: "",
    sidebarInfo: null,
  };

  const getSidebarInfo = async () => {
    const result = await fetchGetRes(sidebarInfoUrl);

    return result;
  }

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
          isAuth: initialState.isAuth,
          username: initialState.username,
          type: initialState.type,
          sidebarInfo: initialState.sidebarInfo,
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
