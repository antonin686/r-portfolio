import ReactDOM from "react-dom";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { fetchGetRes } from "./../helpers/FormHelper";

function PopupContainer() {
  return <div id="custom-popup-container"></div>;
}

const snackbar = {
  success: (message: string, callback?: any, autoHideDuration?: number) => {
    const handleClose = () => {
      ReactDOM.render(<></>, document.getElementById("custom-popup-container"));
      if (callback) callback();
    };
    let element = (
      <Snackbar
        open={true}
        autoHideDuration={autoHideDuration ? autoHideDuration : 2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="success">
          {message}
        </Alert>
      </Snackbar>
    );

    ReactDOM.render(element, document.getElementById("custom-popup-container"));
  },
  error: (message: string, callback?: any) => {
    const handleClose = () => {
      ReactDOM.render(<></>, document.getElementById("custom-popup-container"));
      if (callback) callback();
    };
    let element = (
      <Snackbar open={true} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
          {message}
        </Alert>
      </Snackbar>
    );

    ReactDOM.render(element, document.getElementById("custom-popup-container"));
  },
};

const dialog = {
  delete: (url: string, renewState: any) => {
    const handleClose = () => {
      ReactDOM.render(<></>, document.getElementById("custom-popup-container"));
    };

    const paperStyle = {
      style: {
        backgroundColor: "#15202b",
      },
    };

    const deleteHandler = async () => {
      let response = await fetchGetRes(url);
      handleClose();
      // console.log(response);
      if (response === 200) {     
        renewState();
        snackbar.success("Successfully Deleted.");
      } else {
        snackbar.error("An Error Occurred");
      }
    };

    let element = (
      <Dialog open={true} onClose={handleClose} PaperProps={paperStyle} fullWidth>
        <DialogTitle className="text-primary">Are you sure?</DialogTitle>
        <DialogContent dividers>
          <div className="text-primary">You won't be able to revert this!</div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={deleteHandler} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
    ReactDOM.render(element, document.getElementById("custom-popup-container"));
  },
};

export { PopupContainer, snackbar, dialog };
