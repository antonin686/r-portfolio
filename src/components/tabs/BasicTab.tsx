import BasicTabPage from "./../../components/tabs/BasicTabPage";
import BasicTabProject from "./../../components/tabs/BasicTabProject";
import { IpageInfo } from "../../helpers/Interfaces";

interface props {
  pageInfo: IpageInfo;
  renewState: any;
}
function BasicTab({ pageInfo, renewState }: props) {
  return (
    <div>
      <div className="c-form">
        {pageInfo.type === "project" ? (
          <BasicTabProject pageInfo={pageInfo} renewState={renewState} />
        ) : (
          <BasicTabPage pageInfo={pageInfo} renewState={renewState} />
        )}
      </div>
    </div>
  );
}

export default BasicTab;
