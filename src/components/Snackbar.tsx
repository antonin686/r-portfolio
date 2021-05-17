import ReactDOM from "react-dom";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

function SnackbarContainer() {
  return <div id="custom-snackbar-container"></div>;
}

const snackbar = {
  success: (message: string, callback?: any) => {
    const handleClose = () => {
      ReactDOM.render(<></>, document.getElementById("custom-snackbar-container"));
      if (callback) callback();
    };
    let element = (
      <Snackbar open={true} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {message}
        </Alert>
      </Snackbar>
    );

    ReactDOM.render(element, document.getElementById("custom-snackbar-container"));
  },
  error: (message: string, callback?: any) => {
    const handleClose = () => {
      ReactDOM.render(<></>, document.getElementById("custom-snackbar-container"));
      if (callback) callback();
    };
    let element = (
      <Snackbar open={true} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
          {message}
        </Alert>
      </Snackbar>
    );

    ReactDOM.render(element, document.getElementById("custom-snackbar-container"));
  },
};

export { SnackbarContainer, snackbar };
