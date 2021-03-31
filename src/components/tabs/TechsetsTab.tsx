import { useState, useRef } from "react";
import useGetFetch from "./../../hooks/useGetFetch";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Table from "./../Table";
import TechsetCol from "./../../helpers/columns/TechsetCol";
import { fetchPostRes, succMsg, errMsg } from "./../../helpers/FormHelper";
import { techsetsPageUrl } from "./../../helpers/ApiLinks";
import { techsetsCreateUrl } from "./../../helpers/ApiLinks";

function TechsetsTab({ page_id }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const nameEl = useRef<any>(null);
  const extraEl = useRef<any>(null);
  const [techsets, renewState]: any = useGetFetch(techsetsPageUrl + page_id);
  const columns = TechsetCol(renewState);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitHandler = async () => {
    let data = {
      page_id: 1,
      name: nameEl.current.value,
      extra: extraEl.current.value,
    };

    let result = await fetchPostRes(techsetsCreateUrl, data);

    if (result === 200) {
      handleClose();
      renewState();
      succMsg("Techset Updated");
    } else {
      errMsg("Error Occured");
    }
  };
  const paperStyle = {
    style: {
      backgroundColor: "#15202b",
    },
  };

  return (
    <div>
      {techsets ? (
        <div className="c-tab-wrapper">
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New Tech
              </Button>
            </Grid>
          </Grid>
          <div className="responsive">
            {techsets && <Table columns={columns} data={techsets} />}
          </div>
          {/* Modal */}
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={paperStyle}
            fullWidth
          >
            <DialogTitle className="text-primary">Add New Tech</DialogTitle>
            <DialogContent dividers>
              <label className="text-primary">Name</label>
              <input ref={nameEl} className="c-input" />
              <label className="text-primary">Extra</label>
              <input ref={extraEl} className="c-input" />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleClose}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={submitHandler}
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TechsetsTab;
