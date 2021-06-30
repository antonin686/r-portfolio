import axios from "axios";

const fetchPostRes = async (action: string, data: any, token?: boolean) => {
  let formdata = new FormData();
  let dataArr = Object.entries(data).map(([key, value]) => ({ key, value }));

  dataArr.forEach((element: any) => {
    formdata.append(element.key, element.value);
  });

  let config: any = null;
  
  if (token) {
    config = {
      headers: {
        "auth-token": token,
      },
    };
  }

  let myObject = await axios.post(action, formdata, config);
  //console.log(myObject)
  return myObject.data;
};

const fetchGetRes = async (action: string) => {
  let myObject = await axios.get(action);
  return myObject.data;
};

export { fetchPostRes, fetchGetRes };
