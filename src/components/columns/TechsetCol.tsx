import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconButton } from "@material-ui/core";
import { fetchPostRes } from "../../helpers/FormHelper";
import { techsetsUpdateUrl, techsetsDeleteUrl } from "../../helpers/ApiLinks";
import { snackbar, dialog } from "../PopupManager";

const TechsetCol = (renewState: any, token: string) => {
  const inputRefs: any = useRef([]);
  inputRefs.current = [];

  const addTORef = (el: any) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const updateHandler = async (id: any) => {
    let newNameValue = null;
    let newExtraValue = null;
    inputRefs.current.forEach((element: any) => {
      if (element.name === "name" + id) {
        newNameValue = element.value;
      } else if (element.name === "extra" + id) {
        newExtraValue = element.value;
      }
    });

    let data = { name: newNameValue, extra: newExtraValue };
    let url = techsetsUpdateUrl + id;
    let result = await fetchPostRes(url, data, token);

    if (result === 200) {
      renewState();
      snackbar.success("Techset Updated");
    } else {
      snackbar.error("An Error Occurred");
    }
  };

  const deleteHandler = async (id: number) => {
    let url = techsetsDeleteUrl + id;
    dialog.delete(url, renewState, token);
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
            name={"name" + row.original.id}
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
            name={"extra" + row.original.id}
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
            <IconButton onClick={() => updateHandler(row.original.id)} color="primary">
              <FaEdit />
            </IconButton>
            <IconButton onClick={() => deleteHandler(row.original.id)} color="secondary">
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
