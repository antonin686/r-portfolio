import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Ioptions {
  reverse?: boolean;
}

function useGetFetch(url: string, options?: Ioptions) {
  const [state, setstate] = useState(null);

  const getMethod = useCallback(() => {
    axios.get(url).then((response) => {
      if (options?.reverse === true) {
        response.data = response.data.reverse();
      }
      setstate(response.data);
    });
  }, [options?.reverse, url]);

  useEffect(() => {
    getMethod();
  }, [url, options?.reverse, getMethod]);

  const renewState = () => {
    getMethod();
  } 
  return [state, renewState];
}

export default useGetFetch;
