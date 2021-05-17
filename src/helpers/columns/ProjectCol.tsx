import { useHistory } from "react-router-dom";
import { IconButton, Paper } from "@material-ui/core";
import { snackbar } from "../../components/Snackbar";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import useDialog from "./../../hooks/useDialog";

const ProjectCol = (renewState: any) => {
  const history = useHistory();
  const updateHandler = (id: number) => {
    history.push("/admin/projects/edit/" + id);
  };

  // const DialogContent = () => <div>Hello</div>;
  // const [setUpdateDialogOpen, UpdateDialog] = useDialog({
  //   Content: DialogContent,
  //   title: "Delete",
  // });

  // <UpdateDialog />
  const deleteHandler = () => {
   
  };

  const columns = [
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
      Header: "Title",
      accessor: "header_title",
    },
    {
      Header: "Tags",
      accessor: "tags",
      Cell: ({ value }: any) => {
        return value.join(" | ");
      },
    },
    {
      Header: "Added",
      accessor: "created_at",
      Cell: ({ value }: any) => {
        return value.split(" ")[0].split("-").reverse().join("/");
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
            <IconButton onClick={deleteHandler} color="secondary">
              <RiDeleteBin2Line />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return columns;
};

export default ProjectCol;
