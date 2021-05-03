import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconButton } from "@material-ui/core";

import { fetchGetRes, succMsg, errMsg } from "./../FormHelper";
import { imageDeleteUrl } from "./../ApiLinks";
import Swal from "sweetalert2";
import ModalImage from "react-modal-image";
interface Props {
  renewState: any;
  updateHandler: any;
}
const ImageCol = (renewState: any, updateHandler: any) => {
  const inputRefs: any = useRef([]);
  inputRefs.current = [];

  const addTORef = (el: any) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const deleteHandler = async (row: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchGetRes(
          imageDeleteUrl + `/${row.original.id}`
        );
        if (response === 200) {
          renewState();
          succMsg("Successfully Deleted");
        } else {
          errMsg("An Error Occurred");
        }
      }
    });
  };

  const columns = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "#",
      Cell: ({ row }: any) => {
        return row.index + 1;
      },
    },
    {
      Header: "Title",
      accessor: "title",      
    },
    {
      Header: "Image",
      accessor: "path",
      Cell: ({ value }: any) => {
        return (
          <ModalImage className="c-form-img" small={value} large={value} />
        );
      },
    },   
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }: any) => {
        return (
          <div>
            <IconButton onClick={async () => updateHandler(row)} color="primary">
              <FaEdit />
            </IconButton>
            <IconButton onClick={() => deleteHandler(row)} color="secondary">
              <RiDeleteBin2Line />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default ImageCol;
