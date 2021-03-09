import { useContext } from "react";
import { AuthContext } from "./../helpers/AuthProvider";
import { Iauth } from "./../helpers/Interfaces";
function useAuth() {
  const [auth, setAuth] = useContext<any>(AuthContext);
  return {
    signIn: (data: Iauth) => {
      setAuth({
        isAuth: true,
        username: data.username,
        type: data.type,
      });
    },
    signOut: () => {
      setAuth({
        isAuth: false,
        username: "",
        type: "",
      });
    },
    user: { isAuth: auth.isAuth, username: auth.username, type: auth.type },
  };
}

export default useAuth;
