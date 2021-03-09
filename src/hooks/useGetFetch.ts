import { useState, useEffect } from "react";
import axios from "axios";

function useGetFetch(url: string) {
  const [state, setstate] = useState(null);


  useEffect(() => {
    axios.get(url).then((response) => {
      setstate(response.data);
    });
  }, [url]);

  return state;
}

export default useGetFetch;
