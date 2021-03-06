import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconButton } from "@material-ui/core";
import { imageDeleteUrl } from "../../helpers/ApiLinks";
import ModalImage from "react-modal-image";
import { dialog } from "../PopupManager";

const ImageCol = (renewState: any, updateHandler: any, token?: string) => {
  const deleteHandler = async (id: number) => {
    let url = imageDeleteUrl + id;
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
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Image",
      accessor: "path",
      Cell: ({ value }: any) => {
        return <ModalImage className="c-form-img" small={value} large={value} />;
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

export default ImageCol;
