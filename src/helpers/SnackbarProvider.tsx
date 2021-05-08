import { useState, createContext } from "react";
import { Iauth } from "./Interfaces";

const SnackbarContext = createContext({});

function SnackbarProvider(props: any) {
  const [auth, setAuth] = useState<Iauth>({
    isAuth: false,
    username: "",
    type: "",
  });

  return (
    <SnackbarContext.Provider value={[auth, setAuth]}>
      {props.children}
    </SnackbarContext.Provider>
  );
}

export { SnackbarContext, SnackbarProvider };
