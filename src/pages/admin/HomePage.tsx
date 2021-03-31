import useNavTabs from "../../hooks/useNavTabs";
import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import { homePageUrl } from "../../helpers/ApiLinks";
import useGetFetch from "../../hooks/useGetFetch";
import CustomLoader from "../../components/CustomLoader";
import BasicTab from "../../components/tabs/BasicTab";
import TechsetsTab from "../../components/tabs/TechsetsTab";

function HomePage() {
  const tabItems = ["Basic", "Techsets", "Links"];
  const { tab, Tabs } = useNavTabs(tabItems, "Basic");
  const [homePage]: any = useGetFetch(homePageUrl);

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
              {!homePage ? (
                <CustomLoader />
              ) : (
                <div>
                  {tab === "Basic" && (
                    <BasicTab
                      id={homePage.pageInfo.id}
                      header_title={homePage.pageInfo.header_title}
                      header_body={homePage.pageInfo.header_body}
                      img_path={homePage.pageInfo.img_path}
                      main_title={homePage.pageInfo.main_title}
                      main_body={homePage.pageInfo.main_body}
                      extra_title={homePage.pageInfo.extra_title}
                      extra_body={homePage.pageInfo.extra_body}
                    />
                  )}
                  {tab === "Techsets" && (
                    <TechsetsTab page_id={1}/>
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

export default HomePage;
