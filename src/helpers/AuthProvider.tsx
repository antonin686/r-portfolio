import { useState, createContext } from "react";
import { Iauth } from "./Interfaces";

const AuthContext = createContext({});

function AuthProvider(props: any) {
  const [auth, setAuth] = useState<Iauth>({
    isAuth: false,
    username: "",
    type: "",
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
