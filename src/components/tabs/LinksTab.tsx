import { useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import useDialog from "./../../hooks/useDialog";
import { snackbar } from "../PopupManager";
import Table from "./../Table";
import LinkCol from "./../../helpers/columns/LinkCol";
import { fetchPostRes} from "./../../helpers/FormHelper";
import { finderLinkCreateUrl } from "./../../helpers/ApiLinks";

interface props {
  page_id: number;
  data: any;
  icons: any;
  renewState: any;
}

function LinksTab({ page_id, data, icons, renewState }: props) {
  const iconEl = useRef<any>(null);
  const linkEl = useRef<any>(null);
  const linkErrEl = useRef<any>(null);
  const columns = LinkCol(icons, renewState);

  const onSubmit = async () => {
    if (!linkEl.current.value) {
      linkErrEl.current.style.display = "block";
      return;
    } else {
      linkErrEl.current.style.display = "none";
    }
    let data = {
      page_id: page_id,
      icon_id: iconEl.current.value,
      link: linkEl.current.value,
    };
    let result = await fetchPostRes(finderLinkCreateUrl, data);

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
      <select ref={iconEl} className="c-table-input">
        {icons.map((icon: any) => (
          <option key={icon.id} value={icon.id}>
            {icon.name}
          </option>
        ))}
      </select>
      <label className="text-primary">Link</label>
      <input ref={linkEl} className="c-input" />
      <div ref={linkErrEl} className="text-danger hidden">
        *Link Cant Be Empty!
      </div>
    </div>
  );

  const [setCreateDialogOpen, CreateDialog]: any = useDialog({
    Content: DialogContent,
    title: "Add New Link",
    submit: { handler: onSubmit, text: "Submit" },
  });

  return (
    <div className="c-tab-wrapper">
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateDialogOpen(true)}
          >
            Add New Link
          </Button>
        </Grid>
      </Grid>
      <div className="responsive">
        <Table columns={columns} data={data} />
      </div>
      <CreateDialog />
    </div>
  );
}

export default LinksTab;
