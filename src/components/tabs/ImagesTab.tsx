import { useState, useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import Table from "./../Table";
import ImageCol from "./../../helpers/columns/ImageCol";
import useDialog from "./../../hooks/useDialog";
import { fetchPostRes, succMsg, errMsg } from "./../../helpers/FormHelper";
import { imageUpdateUrl } from "./../../helpers/ApiLinks";

interface props {
  page_id: number;
  data: any;
  renewState: any;
}

function ImagesTab({ page_id, data, renewState }: props) {

  const titleEl = useRef<any>(null);
  const imgEl = useRef<any>(null);
  const [rowData, setRowData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const updateHandler = async (row: any) => {
    setRowData(row.original);
    setUpdateDialogOpen(true);
  };
  const createSubmitHandler = async () => {
    let data = {
      title: titleEl.current.value,
      image: imgEl.current.files[0],
    };
    // let result = await fetchPostRes(imageUpdateUrl + rowData?.id, data);
    // if (result === 200) {
    //   succMsg("Image Details Updated");
    //   setUpdateDialogOpen(false);
    //   renewState();
    // } else {
    //   errMsg(result);
    // }
  };
  const updateSubmitHandler = async () => {
    let title = titleEl.current.value;
    let image = imgEl.current.files[0];
    if (!title) {
      title 
    }
    let data = {
      title: title,
      image: image,
    };
    let result = await fetchPostRes(imageUpdateUrl + rowData?.id, data);
    if (result === 200) {
      succMsg("Image Details Updated");
      setUpdateDialogOpen(false);
      renewState();
    } else {
      setUpdateDialogOpen(false);
      errMsg(result);
    }
  };
  const columns = ImageCol(renewState, updateHandler);

  const DialogContent = () => (
    <div>
      <label className="text-primary">Title</label>
      <input ref={titleEl} className="c-input" defaultValue={rowData?.title} />
      <label className="text-primary">Image</label>
      <input type="file" ref={imgEl} className="c-input" />
    </div>
  );

  const [setCreateDialogOpen, CreateDialog]: any = useDialog({
    Content: DialogContent,
    title: "Add New Image",
    submit: { handler: updateSubmitHandler, text: "Submit" },
  });

  const [setUpdateDialogOpen, UpdateDialog]: any = useDialog({
    Content: DialogContent,
    title: "Update Image Details",
    submit: { handler: updateSubmitHandler, text: "Submit" },
  });

  return (
    <div className="c-tab-wrapper">
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setRowData(null);
              setCreateDialogOpen(true);
            }}
          >
            Add New Image
          </Button>
        </Grid>
      </Grid>
      <div className="responsive">
        <Table columns={columns} data={data} />
      </div>
      <CreateDialog />
      <UpdateDialog />
    </div>
  );
}

export default ImagesTab;
