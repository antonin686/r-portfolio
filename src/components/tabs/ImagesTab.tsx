import { useState, useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import Table from "./../Table";
import ImageCol from "../columns/ImageCol";
import useDialog from "./../../hooks/useDialog";
import { fetchPostRes } from "./../../helpers/FormHelper";
import { imageCreateUrl, imageUpdateUrl } from "./../../helpers/ApiLinks";
import { snackbar } from "../PopupManager";
import useAuth from "./../../hooks/useAuth";

interface props {
  page_id: number;
  data: any;
  renewState: any;
}

function ImagesTab({ page_id, data, renewState }: props) {
  const auth = useAuth();
  const titleEl = useRef<any>(null);
  const imgEl = useRef<any>(null);
  const titleErrEl = useRef<any>(null);
  const imgErrEl = useRef<any>(null);
  const [rowData, setRowData] = useState<any>(null);
  const updateHandler = async (row: any) => {
    setRowData(row.original);
    setUpdateDialogOpen(true);
  };
  const columns = ImageCol(renewState, updateHandler, auth.user.token);

  const createSubmitHandler = async () => {
    let title = titleEl.current.value;
    let image = imgEl.current.files[0];
    if (!title) {
      titleErrEl.current.style.display = "block";
      return;
    } else titleErrEl.current.style.display = "none";
    if (!image) {
      imgErrEl.current.style.display = "block";
      return;
    } else imgErrEl.current.style.display = "none";
    let data = {
      page_id: page_id,
      title: titleEl.current.value,
      image: imgEl.current.files[0],
    };
    let result = await fetchPostRes(imageCreateUrl, data, auth.user.token);
    if (result === 200) {
      snackbar.success("Image Details Updated");
      setCreateDialogOpen(false);
      renewState();
    } else {
      snackbar.error(result);
    }
  };

  const updateSubmitHandler = async () => {
    let title = titleEl.current.value;
    let image = imgEl.current.files[0];
    if (!title) {
      titleErrEl.current.style.display = "block";
      return;
    } else titleErrEl.current.style.display = "none";

    imgErrEl.current.style.display = "none";
    let data = {
      title: title,
      image: image,
    };
    let result = await fetchPostRes(imageUpdateUrl + rowData?.id, data, auth.user.token);
    if (result === 200) {
      snackbar.success("Image Details Updated");
      setUpdateDialogOpen(false);
      renewState();
    } else {
      setUpdateDialogOpen(false);
      snackbar.error(result);
    }
  };

  const DialogContent = () => (
    <div>
      <label className="text-primary">Title</label>
      <input ref={titleEl} className="c-input" defaultValue={rowData?.title} />
      <div ref={titleErrEl} className="text-danger hidden">
        *Title Cant Be Empty!
      </div>
      <label className="text-primary">Image</label>
      <input type="file" ref={imgEl} className="c-input" />
      <div ref={imgErrEl} className="text-danger hidden">
        *Image Cant Be Empty!
      </div>
    </div>
  );

  const [setCreateDialogOpen, CreateDialog]: any = useDialog({
    Content: DialogContent,
    title: "Add New Image",
    submit: { handler: createSubmitHandler, text: "Create" },
  });

  const [setUpdateDialogOpen, UpdateDialog]: any = useDialog({
    Content: DialogContent,
    title: "Update Image Details",
    submit: { handler: updateSubmitHandler, text: "Update" },
  });

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            className="c-primary-btn"
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
