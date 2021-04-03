import { useState, useRef } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Table from "./../Table";
import LinkCol from "./../../helpers/columns/LinkCol";
import { fetchPostRes, succMsg, errMsg } from "./../../helpers/FormHelper";
import { finderLinkCreateUrl } from "./../../helpers/ApiLinks";

interface props {
  page_id: number;
  data: any;
  icons: any;
  renewState: any;
}

function LinksTab({ page_id, data, icons, renewState }: props) {
  const [open, setOpen] = useState<boolean>(false);
  const columns = LinkCol(icons, renewState);
  const iconEl = useRef<any>(null);
  const linkEl = useRef<any>(null);
  const [linkErr, setLinkErr] = useState(false);
  const submitHandler = async () => {
    if (!linkEl.current.value) {
      setLinkErr(true);
      return;
    } else {
      setLinkErr(false);
    }
    let data = {
      page_id: page_id,
      icon_id: iconEl.current.value,
      link: linkEl.current.value,
    };
    let result = await fetchPostRes(finderLinkCreateUrl, data);
    
    if (result === 200) {
      handleClose();
      renewState();
      succMsg("Techset Updated");
    } else {
      errMsg("Error Occured");
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const paperStyle = {
    style: {
      backgroundColor: "#15202b",
    },
  };
  return (
    <div className="c-tab-wrapper">
      <Grid container spacing={1}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add New Link
          </Button>
        </Grid>
      </Grid>
      <div className="responsive">
        <Table columns={columns} data={data} />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={paperStyle}
        fullWidth
      >
        <DialogTitle className="text-primary">Add New Tech</DialogTitle>
        <DialogContent dividers>
          <label className="text-primary">Name</label>
          <select ref={iconEl} className="c-table-input">
            {icons.map((icon: any) => (
              <option key={icon.id} value={icon.id}>
                {icon.name}
              </option>
            ))}
          </select>
          <label className="text-primary">Link</label>
          <input ref={linkEl} className="c-input" />
          {linkErr && <div className="text-danger">*Link Cant Be Empty!</div>}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LinksTab;
