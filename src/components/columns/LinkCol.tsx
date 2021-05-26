import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconButton } from "@material-ui/core";
import { fetchPostRes } from "../../helpers/FormHelper";
import { finderLinkUpdateUrl, finderLinkDeleteUrl } from "../../helpers/ApiLinks";
import { snackbar, dialog } from "../PopupManager";

const LinkCol = (icons: any, renewState: any) => {
  const inputRefs: any = useRef([]);
  inputRefs.current = [];

  const addTORef = (el: any) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const updateHandler = async (id: number) => {
    let newIconValue: string | null = null;
    let newLinkValue: string | null = null;
    inputRefs.current.forEach((element: any) => {
      if (element.tagName === "SELECT" && element.name === "icon" + id) {
        newIconValue = element.value;
      } else if (element.tagName === "INPUT" && element.name === "link" + id) {
        newLinkValue = element.value;
      }
    });

    let data = { icon_id: newIconValue, link: newLinkValue };
    let url = finderLinkUpdateUrl + id;
    let result = await fetchPostRes(url, data);

    if (result === 200) {
      renewState();
      snackbar.success("Link Updated");
    } else {
      snackbar.error("An Error Occurred");
    }
  };

  const deleteHandler = async (id: number) => {
    let url = finderLinkDeleteUrl + id;
    dialog.delete(url, renewState);
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
      Header: "Icon",
      accessor: "icon_id",
      Cell: ({ row, value }: any) => {
        return (
          <select
            ref={addTORef}
            name={"icon" + row.original.id}
            className="c-table-input"
            defaultValue={value}
          >
            {icons.map((icon: any) => (
              <option key={icon.id} value={icon.id}>
                {icon.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      Header: "Link",
      accessor: "link",
      Cell: ({ row, value }: any) => {
        return (
          <input
            className="c-table-input"
            ref={addTORef}
            name={"link" + row.original.id}
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

export default LinkCol;
