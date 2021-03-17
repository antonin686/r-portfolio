import { useForm } from "react-hook-form";
import {
  
} from "../FormGroup";
import { fetchPostRes, succMsg, errMsg } from "../../helpers/FormHelper";
import { Itechset } from "./../../helpers/Interfaces";

function TechsetsTab({ techsets }: any) {
  console.log(techsets)
  return (
    <div className="c-tab-wrapper">
      <div className="c-form">
        <input type="text" className="c-input"/>
      </div>
    </div>
  );
}

export default TechsetsTab;
