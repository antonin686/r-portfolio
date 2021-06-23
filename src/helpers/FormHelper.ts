import axios from "axios";

const fetchPostRes = async (action: string, data: any) => {
  let formdata = new FormData();
  let dataArr = Object.entries(data).map(([key, value]) => ({ key, value }));

  dataArr.forEach((element: any) => {
    formdata.append(element.key, element.value);
  });

  let myObject = await axios.post(action, formdata);
  //console.log(myObject)
  return myObject.data;
};

const fetchGetRes = async (action: string) => {
  let myObject = await axios.get(action);
  return myObject.data;
};

export { fetchPostRes, fetchGetRes };
