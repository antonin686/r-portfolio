import { useHistory } from "react-router-dom";
import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import { projectsUrl } from "./../../helpers/ApiLinks";
import Table from "./../../components/Table";
import ProjectCol from "./../../helpers/columns/ProjectCol";
import useGetFetch from "./../../hooks/useGetFetch";
import { Button, Grid } from "@material-ui/core";
function Index() {
  const history = useHistory();
  const [projects] = useGetFetch(projectsUrl);
  const handleAddclick = () => {
    history.push("/admin/projects/create");
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
            <div className="c-card-header">Projects</div>
            <div className="c-card-body">
              <div className="c-tab-wrapper">
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddclick}
                    >
                      Add New Project
                    </Button>
                  </Grid>
                </Grid>
                <div className="responsive">
                  {projects && (
                    <Table
                      columns={ProjectCol}
                      data={projects}
                      clickRedirectURL={"/admin/projects/edit/"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
