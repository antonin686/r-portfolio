import { BsInfoCircle } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconButton } from "@material-ui/core";
import { dialog } from "../PopupManager";
import { contactDeleteUrl } from "../../helpers/ApiLinks";
const ContactCol = (renewState: any, infoHandler: any, token: string) => {
  const deleteHandler = async (id: number) => {
    let url = contactDeleteUrl + id;
    dialog.delete(url, renewState, token);
  };

  const column = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "#",
      Cell: ({ row }: any) => {
        return row.original.id;
      },
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Added",
      accessor: "created_at",
      Cell: ({ value }: any) => {
        return value.split(" ")[0].split("-").reverse().join("/");
      },
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => {
        return (
          <div>
            <IconButton
              onClick={async () => infoHandler(row.original.id)}
              color="primary"
            >
              <BsInfoCircle />
            </IconButton>
            <IconButton onClick={() => deleteHandler(row.original.id)} color="secondary">
              <RiDeleteBin2Line />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return column;
};

export default ContactCol;
