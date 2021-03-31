import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconButton } from "@material-ui/core";

import { fetchGetRes, fetchPostRes, succMsg, errMsg } from "./../FormHelper";
import { techsetsUpdateUrl, techsetsDeleteUrl } from "./../ApiLinks";
import Swal from "sweetalert2";

const TechsetCol = (renewState: any) => {
  const inputRefs: any = useRef([]);
  inputRefs.current = [];

  const addTORef = (el: any) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const updateHandler = async (row: any) => {
    let newNameValue = null;
    let newExtraValue = null;
    console.log("here");
    inputRefs.current.forEach((element: any) => {
      if (element.name === row.original.name) {
        newNameValue = element.value;
      } else if (element.name === row.original.extra) {
        newExtraValue = element.value;
      }
    });

    let data = { name: newNameValue, extra: newExtraValue };
    let url = techsetsUpdateUrl + `/${row.original.id}`;
    let result = await fetchPostRes(url, data);

    if (result === 200) {
      renewState();
      succMsg("Techset Updated");
    } else {
      errMsg("An Error Occurred");
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
          techsetsDeleteUrl + `/${row.original.id}`
        );

        if (response === 200) {
          renewState();
          Swal.fire("Deleted!", "Successfully Deleted.", "success");
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
      Header: "Name",
      accessor: "name",
      Cell: ({ row, value }: any) => {
        return (
          <input
            className="c-table-input"
            ref={addTORef}
            name={value}
            defaultValue={value}
          />
        );
      },
    },
    {
      Header: "Extra",
      accessor: "extra",
      Cell: ({ row, value }: any) => {
        return (
          <input
            className="c-table-input"
            ref={addTORef}
            name={value}
            defaultValue={value}
          />
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }: any) => {
        return (
          <div>
            <IconButton onClick={() => updateHandler(row)} color="primary">
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

export default TechsetCol;
