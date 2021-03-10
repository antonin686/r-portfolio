import { useState, useEffect } from "react";
import axios from "axios";

interface Ioptions {
  reverse?: boolean;
}

function useGetFetch(url: string, options?: Ioptions) {
  const [state, setstate] = useState(null);


  useEffect(() => {
    axios.get(url).then((response) => {
      if(options?.reverse === true) {
        response.data = response.data.reverse();
      }
      setstate(response.data);
    });
  }, [url, options?.reverse]);

  return state;
}

export default useGetFetch;
