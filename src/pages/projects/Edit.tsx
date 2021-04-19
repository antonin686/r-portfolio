import { useParams } from "react-router-dom";
import useGetFetch from "./../../hooks/useGetFetch";
import useNavTabs from "../../hooks/useNavTabs";
import { projectPageUrl, iconsIndexUrl } from "./../../helpers/ApiLinks";
import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import CustomLoader from "../../components/CustomLoader";
import BasicTab from "../../components/tabs/BasicTab";
import TechsetsTab from "../../components/tabs/TechsetsTab";
import LinksTab from "../../components/tabs/LinksTab";
function Edit() {
  const { id } = useParams<any>();
  const url = `${projectPageUrl}/${id}`;
  const [projectPage, renewState]: any = useGetFetch(url);
  const tabItems = ["Basic", "Techsets", "Links"];
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
                <div>
                  {tab === "Basic" && (
                    <BasicTab pageInfo={projectPage.pageInfo} />
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
