import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";
import useGetFetch from "./../../hooks/useGetFetch";
import useNavTabs from "../../hooks/useNavTabs";
import { projectPageUrl, iconsIndexUrl } from "./../../helpers/ApiLinks";
import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import CustomLoader from "../../components/CustomLoader";
import BasicTab from "../../components/tabs/BasicTab";
import TechsetsTab from "../../components/tabs/TechsetsTab";
import LinksTab from "../../components/tabs/LinksTab";
import ImagesTab from "../../components/tabs/ImagesTab";
function Edit() {
  const { id } = useParams<any>();
  const url = `${projectPageUrl}/${id}`;
  const [projectPage, renewState]: any = useGetFetch(url);
  const tabItems = ["Basic", "Techsets", "Links", "Images"];
  const { tab, Tabs } = useNavTabs(tabItems, "Basic");
  const [icons] = useGetFetch(iconsIndexUrl);
  
  return (
    <div>
      <MacNav />
      <div className="container">
        <div className="main-wrapper">
          <div>
            <Sidebar />
          </div>
          <div className="c-card">
            <div className="c-card-header">
              <Tabs />
            </div>
            <div className="c-card-body">
              {!projectPage || !icons ? (
                <CustomLoader />
              ) : (
                <div className="c-tab-wrapper">
                  <div className="c-breadcrumbs">
                    <Breadcrumbs>
                      <Link to="/admin/projects">
                        Projects
                      </Link>
                      <div className="text-secondary">Edit</div>
                    </Breadcrumbs>
                  </div>
                  {tab === "Basic" && (
                    <BasicTab pageInfo={projectPage.pageInfo} renewState={renewState} />
                  )}
                  {tab === "Techsets" && (
                    <TechsetsTab
                      page_id={projectPage.pageInfo.id}
                      techsets={projectPage.techsets}
                      renewState={renewState}
                    />
                  )}
                  {tab === "Links" && (
                    <LinksTab
                      page_id={projectPage.pageInfo.id}
                      data={projectPage.finderLinks}
                      icons={icons}
                      renewState={renewState}
                    />
                  )}
                  {tab === "Images" && (
                    <ImagesTab
                      page_id={projectPage.pageInfo.id}
                      data={projectPage.images}
                      renewState={renewState}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
