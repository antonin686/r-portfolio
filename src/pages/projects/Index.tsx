import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import { projectsUrl } from "./../../helpers/ApiLinks";
import Table from "./../../components/Table";
import ProjectCol from "./../../helpers/columns/ProjectCol";
import useGetFetch from "./../../hooks/useGetFetch";

function Index() {
  const [projects] = useGetFetch(projectsUrl);

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
              <div className="responsive">
                {projects && (
                  <Table
                    columns={ProjectCol}
                    data={projects}
                    clickRedirectURL={"/admin/projects/"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
