import useNavTabs from "../../hooks/useNavTabs";
import { homePageUrl, iconsIndexUrl } from "../../helpers/ApiLinks";
import useGetFetch from "../../hooks/useGetFetch";
import CustomLoader from "../../components/CustomLoader";
import BasicTab from "../../components/tabs/BasicTab";
import TechsetsTab from "../../components/tabs/TechsetsTab";
import LinksTab from "../../components/tabs/LinksTab";
import React from "react";

function HomePage() {
  const tabItems = ["Basic", "Techsets", "Links"];
  const { tab, Tabs } = useNavTabs(tabItems, "Basic");
  const [homePage, renewState]: any = useGetFetch(homePageUrl);
  const [icons] = useGetFetch(iconsIndexUrl);
  return (
    <React.Fragment>
      <div className="c-card-header">
        <Tabs />
      </div>
      <div className="c-card-body">
        {!homePage || !icons ? (
          <CustomLoader />
        ) : (
          <div className="c-tab-wrapper">
            {tab === "Basic" && (
              <BasicTab pageInfo={homePage.pageInfo} renewState={renewState} />
            )}
            {tab === "Techsets" && (
              <TechsetsTab
                page_id={1}
                techsets={homePage.techsets}
                renewState={renewState}
              />
            )}
            {tab === "Links" && (
              <LinksTab
                page_id={1}
                data={homePage.finderLinks}
                icons={icons}
                renewState={renewState}
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default HomePage;
