import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useAuth from "./../hooks/useAuth";


interface Ioptions {
  reverse?: boolean;
}

function useGetFetch(url: string, options?: Ioptions) {
  const [state, setstate] = useState(null);
  const auth = useAuth();

  const getMethod = useCallback(() => {
    let option: any = '';
    if (auth.user.token) {
      option = {
        headers : {
          'auth-token' : auth.user.token
        }
      }
    }
    axios.get(url, option).then((response) => {
      if (options?.reverse === true) {
        response.data = response.data.reverse();
      }

      setstate(response.data);
    });
  }, [options?.reverse, auth.user.token, url]);

  useEffect(() => {
    getMethod();
  }, [url, options?.reverse, getMethod]);

  const renewState = () => {
    getMethod();
  } 
  return [state, renewState];
}

export default useGetFetch;
