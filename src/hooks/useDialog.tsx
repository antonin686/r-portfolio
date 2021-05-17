import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
interface props {
  Content?: any;
  title: string;
  Action?: any;
  submit?: any;
  type?: string;
}
function useDialog({ Content, title, Action, submit, type }: props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const paperStyle = {
    style: {
      backgroundColor: "#15202b",
    },
  };
  if (!Content && type === "delete") {
    Content = <div>You won't be able to revert this!</div>;
  }
  const CustomDialog = () => (
    <Dialog open={open} onClose={handleClose} PaperProps={paperStyle} fullWidth>
      <DialogTitle className="text-primary">{title}</DialogTitle>
      <DialogContent dividers>
        <Content />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        {Action && <Action />}
        {submit && (
          <Button
            variant="contained"
            onClick={submit.handler}
            color={submit.btnColor ? submit.btnColor : "primary"}
          >
            {submit.text}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
  return [setOpen, CustomDialog];
}

export default useDialog;
