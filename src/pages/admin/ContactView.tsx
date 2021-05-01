import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { fetchGetRes } from "../../helpers/FormHelper";
import MacNav from "../../components/MacNav";
import Sidebar from "../../components/Sidebar";
import { contactIndexUrl, contactShowUrl } from "../../helpers/ApiLinks";
import Table from "../../components/Table";
import useGetFetch from "../../hooks/useGetFetch";
import ContactCol from "../../helpers/columns/ContactCol";
import { IContact } from "../../helpers/Interfaces";
function ContactMessages() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages] = useGetFetch(contactIndexUrl);
  const [message, setMessage] = useState<IContact | null>(null);
  const trClickHandler = async (event: any) => {
    const id = event.currentTarget.firstChild?.firstChild?.id;
    if (id) {
      const messageDetails = await fetchGetRes(contactShowUrl + id);
      setMessage(messageDetails);
      //console.log(messageDetails);
      handleOpen();
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
    <div>
      <MacNav />
      <div className="container">
        <div className="main-wrapper">
          <div>
            <Sidebar />
          </div>
          <div className="c-card">
            <div className="c-card-header">Contact Messages</div>
            <div className="c-card-body">
              <div className="c-tab-wrapper">
              <div className="responsive">
                {messages && (
                  <Table
                    columns={ContactCol}
                    data={messages}
                    trClickHandler={trClickHandler}
                  />
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={paperStyle}
        fullWidth
      >
        <DialogTitle className="text-primary">Message Details</DialogTitle>
        <DialogContent dividers>
          <Typography className="text-primary" variant="h5">
            Sub: {message?.subject}
          </Typography>
          <Typography className="text-primary" variant="h6">
            {message?.name} ({message?.email})
          </Typography>
          <Typography className="text-primary" variant="subtitle2">
            On {message?.created_at} From IP :- {message?.ip_address}
          </Typography>
          <Divider className="divider"  />
          <Typography className="text-primary" variant="body1">
            {message?.message}
          </Typography>    
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button
            variant="contained"
            href={`mailto:${message?.email}?Subject=Reply%20For%20:%20${message?.subject}`}
            color="primary"
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactMessages;

// Muichirou XIV
