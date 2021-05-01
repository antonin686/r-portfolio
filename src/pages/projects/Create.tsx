import { useForm } from "react-hook-form";
import {
  Form,
  DivRow,
  InputReq,
  Input,
  Textarea,
  TextareaReq,
  SubmitButton,
} from "./../../components/FormGroup";
import { succMsg, errMsg, fetchPostRes } from "../../helpers/FormHelper";
import { projectsCreateUrl } from "../../helpers/ApiLinks";
import { IpageInfo } from "../../helpers/Interfaces";
type Inputs = {
    header_title: string;
    header_body: string;
    main_title: string;
    main_body: string;
    extra_title: string;
    extra_body: string;
    image: any;
  };
function Create() {
    const methods = useForm<Inputs>();
    const onSubmit = async (data: Inputs) => {
        const result = await fetchPostRes(projectsCreateUrl, data);
        if (result === 200) {
          succMsg("Basic Info Updated");
        } else {
          errMsg("An Error Occurred");
        }
      };
    return (
        <div>
            Project Create
        </div>
    )
}

export default Create
