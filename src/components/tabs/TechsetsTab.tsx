import { useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import useDialog from "./../../hooks/useDialog";
import Table from "./../Table";
import TechsetCol from "../columns/TechsetCol";
import { fetchPostRes } from "./../../helpers/FormHelper";
import { techsetsCreateUrl } from "./../../helpers/ApiLinks";
import { snackbar } from "../PopupManager";

interface props {
  page_id: number;
  techsets: any;
  renewState: any;
}

function TechsetsTab({ page_id, techsets, renewState }: props) {
  const nameEl = useRef<any>(null);
  const extraEl = useRef<any>(null);
  const nameErrEl = useRef<any>(null);

  const onSubmit = async () => {
    if (!nameEl.current.value) {
      nameErrEl.current.style.display = "block";
      return;
    } else {
      nameErrEl.current.style.display = "none";
    }
    let data = {
      page_id: page_id,
      name: nameEl.current.value,
      extra: extraEl.current.value,
    };
    let result = await fetchPostRes(techsetsCreateUrl, data);

    if (result === 200) {
      setCreateDialogOpen(false);
      renewState();
      snackbar.success("Techset Updated");
    } else {
      snackbar.error("Error Occured");
    }
  };

  const DialogContent = () => (
    <div>
      <label className="text-primary">Name</label>
      <input ref={nameEl} className="c-input" />
      <div ref={nameErrEl} className="text-danger hidden">
        *Name Cant Be Empty!
      </div>
      <label className="text-primary">Extra</label>
      <input ref={extraEl} className="c-input" />
    </div>
  );

  const [setCreateDialogOpen, CreateDialog]: any = useDialog({
    Content: DialogContent,
    title: "Add New Techset",
    submit: { handler: onSubmit, text: "Submit" },
  });

  const columns = TechsetCol(renewState);

  return (
    <div>
      {techsets && (
        <div>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCreateDialogOpen(true)}
              >
                Add New Tech
              </Button>
            </Grid>
          </Grid>
          <div className="responsive">
            {techsets && <Table columns={columns} data={techsets} />}
          </div>
          {/* Modal */}
          <CreateDialog />
        </div>
      )}
    </div>
  );
}

export default TechsetsTab;
