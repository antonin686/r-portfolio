import axios from "axios";
import Swal from "sweetalert2";

const succMsg = (message: string, callback?: any) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    if (callback) callback();
  });
};

const errMsg = (message: string) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

const fetchPostRes = async (action: string, data: any) => {
  let formdata = new FormData();
  let dataArr = Object.entries(data).map(([key, value]) => ({ key, value }));

  dataArr.forEach((element: any) => {
    formdata.append(element.key, element.value);
  });

  let myObject = await axios.post(action, formdata);

  return myObject.data;
};

const fetchGetRes = async (action: string) => {
  let myObject = await axios.get(action);
  return myObject.data;
};

export { succMsg, errMsg, fetchPostRes, fetchGetRes };
