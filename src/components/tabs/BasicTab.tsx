import ModalImage from "react-modal-image";
import { useForm } from "react-hook-form";
import {
  Form,
  DivRow,
  InputReq,
  Input,
  TextareaReq,
  SubmitButton,
} from "../FormGroup";
import { succMsg, errMsg, fetchPostRes } from "../../helpers/FormHelper";
import { pagesUpdateUrl } from "../../helpers/ApiLinks";
import { IpageInfo } from "../../helpers/Interfaces";

type Inputs = {
  header_title: string;
  header_body: string;
  main_title: string;
  main_body: string;
  extra_title: string;
  extra_body: string;
};
interface props {
  pageInfo: any;
}
function BasicTab({ pageInfo }: props) {
  const methods = useForm<Inputs>({
    defaultValues: {
      header_title: pageInfo.header_title,
      header_body: pageInfo.header_body,
      main_title: pageInfo.main_title,
      main_body: pageInfo.main_body,
      extra_title: pageInfo.extra_title,
      extra_body: pageInfo.extra_body,
    },
  });

  const onSubmit = async (data: Inputs) => {
    const result = await fetchPostRes(pagesUpdateUrl + `/1`, data);
    if (result === 200) {
      succMsg("Basic Info Updated");
    } else {
      errMsg("An Error Occurred");
    }
  };

  return (
    <div className="c-tab-wrapper">
      <div className="c-form">
        <Form formMethods={methods} handler={onSubmit}>
          <DivRow formMethods={methods} className="c-form-row-3">
            <InputReq name="header_title" className="c-input" />
            <InputReq name="main_title" className="c-input" />
            <InputReq name="extra_title" className="c-input" />
          </DivRow>
          <TextareaReq name="header_body" className="c-input" rows={2} />
          <TextareaReq name="main_body" className="c-input" rows={2} />
          <TextareaReq name="extra_body" className="c-input" rows={2} />
          <DivRow formMethods={methods} className="c-form-row-2 grid-center">
            <Input
              type="file"
              label="Upload Image"
              name="img"
              className="c-input"
            />
            <div>
              <ModalImage
                className="c-form-img"
                small={pageInfo.img_path}
                large={pageInfo.img_path}
              />
            </div>
          </DivRow>
          <SubmitButton btnName="Update Information" className="c-form-btn" />
        </Form>
      </div>
    </div>
  );
}

export default BasicTab;
