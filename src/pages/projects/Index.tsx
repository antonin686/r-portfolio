import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { projectsUrl } from "./../../helpers/ApiLinks";
import Table from "./../../components/Table";
import ProjectCol from "../../components/columns/ProjectCol";
import useGetFetch from "./../../hooks/useGetFetch";
import React from "react";
import useAuth from "./../../hooks/useAuth";

function Index() {
  const history = useHistory();
  const [projects, renewState] = useGetFetch(projectsUrl);
  const auth = useAuth();
  const columns = ProjectCol(renewState, auth.user.token);
  const handleAddClick = () => {
    history.push("/admin/projects/create");
  };

  return (
    <React.Fragment>
      <div className="c-card-header">Projects</div>
      <div className="c-card-body">
        <div className="c-tab-wrapper">
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                className="c-primary-btn"
                onClick={handleAddClick}
              >
                Add New Project
              </Button>
            </Grid>
          </Grid>
          <div className="responsive table-hover">
            {projects && <Table columns={columns} data={projects} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
