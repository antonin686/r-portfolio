import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { dialog } from "../../components/PopupManager";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { projectsDeleteUrl } from "./../ApiLinks";

const ProjectCol = (renewState: any) => {
  const history = useHistory();
  const updateHandler = (id: number) => {
    history.push("/admin/projects/edit/" + id);
  };

  const deleteHandler = async (id: number) => {
    let url = projectsDeleteUrl + id;
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

export default ProjectCol;
