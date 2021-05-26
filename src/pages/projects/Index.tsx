import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import { projectsUrl } from "./../../helpers/ApiLinks";
import Table from "./../../components/Table";
import ProjectCol from "../../components/columns/ProjectCol";
import useGetFetch from "./../../hooks/useGetFetch";
import React from "react";
function Index() {
  const history = useHistory();
  const [projects, renewState] = useGetFetch(projectsUrl);

  const columns = ProjectCol(renewState);
  const handleAddclick = () => {
    history.push("/admin/projects/create");
  };

  return (
    <React.Fragment>
      <div className="c-card-header">Projects</div>
      <div className="c-card-body">
        <div className="c-tab-wrapper">
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleAddclick}>
                Add New Project
              </Button>
            </Grid>
          </Grid>
          <div className="responsive">
            {projects && <Table columns={columns} data={projects} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
