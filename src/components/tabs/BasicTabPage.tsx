import ModalImage from "react-modal-image";
import { useForm } from "react-hook-form";
import { snackbar } from "../PopupManager";
import { Form, InputReq, Input, Textarea, TextareaReq } from "../FormGroup";
import { fetchPostRes } from "../../helpers/FormHelper";
import { pagesUpdateUrl } from "../../helpers/ApiLinks";
import { IpageInfo } from "../../helpers/Interfaces";
import useAuth from "./../../hooks/useAuth";
type Inputs = {
  header_title: string;
  header_body: string;
  main_title: string;
  main_body: string;
  extra_title: string;
  extra_body: string;
  img: any;
};

interface props {
  pageInfo: IpageInfo;
  renewState: any;
}

function BasicTabPage({ pageInfo, renewState }: props) {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      header_title: pageInfo.header_title,
      header_body: pageInfo.header_body,
      main_title: pageInfo.main_title,
      main_body: pageInfo.main_body,
      extra_title: pageInfo.extra_title,
      extra_body: pageInfo.extra_body,
      img: null,
    },
  });

  const onSubmit = async (data: Inputs) => {
    if (!data.img) delete data.img;
    else data.img = data.img[0];

    const result = await fetchPostRes(pagesUpdateUrl + pageInfo.id, data, auth.user.token);
    if (result === 200) {
      snackbar.success("Basic Info Updated");
      renewState();
    } else {
      snackbar.error("An Error Occurred");
    }
  };

  const submitter = {
    handleSubmit: handleSubmit,
    handler: onSubmit,
    btnName: "Update Information",
  };
  return (
    <Form register={register} errors={errors} submitter={submitter}>
      <div className="c-form-row-3">
        <InputReq name="header_title" className="c-input" />
        <InputReq name="main_title" className="c-input" />
        <InputReq name="extra_title" className="c-input" />
      </div>
      <TextareaReq name="header_body" className="c-input" rows={2} />
      <TextareaReq name="main_body" className="c-input" rows={2} />
      <Textarea name="extra_body" className="c-input" rows={2} />
      <div className="c-form-row-2 grid-center">
        <Input type="file" label="Upload Image" name="img" className="c-input" />
        <ModalImage
          className="c-form-img"
          small={pageInfo.img_path}
          large={pageInfo.img_path}
        />
      </div>
    </Form>
  );
}

export default BasicTabPage;
