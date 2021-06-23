import React, { useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import useDialog from "../../hooks/useDialog";
import { fetchGetRes } from "../../helpers/FormHelper";
import { contactIndexUrl, contactShowUrl } from "../../helpers/ApiLinks";
import Table from "../../components/Table";
import useGetFetch from "../../hooks/useGetFetch";
import ContactCol from "../../components/columns/ContactCol";
import { IContact } from "../../helpers/Interfaces";
function ContactMessages() {
  const [messages, renewState] = useGetFetch(contactIndexUrl);
  const [message, setMessage] = useState<IContact | null>(null);

  const DialogContent = () => (
    <React.Fragment>
      <Typography className="text-primary" variant="h5">
        Sub: {message?.subject}
      </Typography>
      <Typography className="text-primary" variant="h6">
        {message?.name} ({message?.email})
      </Typography>
      <Typography className="text-primary" variant="subtitle2">
        On {message?.created_at} From IP :- {message?.ip_address}
      </Typography>
      <Divider className="divider" />
      <Typography className="text-primary" variant="body1">
        {message?.message}
      </Typography>
    </React.Fragment>
  );

  const Action = () => (
    <Button
      variant="contained"
      href={`mailto:${message?.email}?Subject=Reply%20For%20:%20${message?.subject}`}
      color="primary"
    >
      Reply
    </Button>
  );

  const [setInfoDialogOpen, InfoDialog]: any = useDialog({
    Content: DialogContent,
    title: "Add New Link",
    Action: Action,
  });

  const infoHandler = async (id: number) => {
    const messageDetails = await fetchGetRes(contactShowUrl + id);
    //console.log(messageDetails);
    if(messageDetails.count) {
      let element: any = document.getElementById('sidebar-contacts');
      element.innerHTML = messageDetails.count;
    }
    setMessage(messageDetails);
    setInfoDialogOpen(true);
  };

  const columns = ContactCol(renewState, infoHandler);
  
  return (
    <React.Fragment>
      <div className="c-card-header">Contact Messages</div>
      <div className="c-card-body">
        <div className="c-tab-wrapper">
          <div className="responsive">
            {messages && <Table columns={columns} data={messages} />}
          </div>
        </div>
      </div>
      <InfoDialog />
    </React.Fragment>
  );
}

export default ContactMessages;

// Muichirou XIV
