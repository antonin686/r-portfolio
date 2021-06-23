import { useContext } from "react";
import { AuthContext } from "../contexts/_Contexts";
import { AUTH_ACTION } from "./../contexts/Actions";
import { Iauth } from "./../helpers/Interfaces";
function useAuth() {
  const [state, dispatch] = useContext<any>(AuthContext);

  const signIn = (data: Iauth) => {
    dispatch({ type: AUTH_ACTION.SIGN_IN, payload: data });
  };

  const signOut = () => {
    dispatch({ type: AUTH_ACTION.SIGN_OUT });
  };

  const setSidebarInfo = (count: number) => {
    dispatch({ type: AUTH_ACTION.SET_SIDEBAR_INFO, payload: { sidebarInfo: count } });
  };

  return {
    signIn,
    signOut,
    user: state,
    setSidebarInfo,
  };
}

export default useAuth;
