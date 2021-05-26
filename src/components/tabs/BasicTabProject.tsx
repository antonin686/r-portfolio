import React, { useState, useRef } from "react";
import ModalImage from "react-modal-image";
import { useForm } from "react-hook-form";
import { snackbar } from "../PopupManager";
import { Form, InputReq, Input, Textarea, TextareaReq } from "../FormGroup";
import { fetchPostRes } from "../../helpers/FormHelper";
import { projectsUpdateUrl } from "../../helpers/ApiLinks";
import { IpageInfo } from "../../helpers/Interfaces";
import { Button, Chip, Switch } from "@material-ui/core";
type Inputs = {
  header_title: string;
  header_body: string;
  main_title: string;
  main_body: string;
  extra_title: string;
  extra_body: string;
  img: any;
  tags: string;
  status: string;
  page_id: string;
};
interface props {
  pageInfo: IpageInfo;
  renewState: any;
}

function BasicTabProject({ pageInfo, renewState }: props) {
  const [tags, setTags] = useState<any>(pageInfo.tags);
  const [status, setStatus] = useState<boolean>(pageInfo.status);
  const [tagsErr, setTagsErr] = useState<any>(null);
  const tagInputEl = useRef<any>();
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
    if (!tags.length) {
      setTagsErr("*At least 1 tag needed");
      return;
    } else {
      setTagsErr(null);
      data.tags = tags.join("|");
      data.page_id = pageInfo.id;
      data.status = status ? "1" : "0";
    }

    if (!data.img) delete data.img;
    else data.img = data.img[0];

    const result = await fetchPostRes(projectsUpdateUrl + pageInfo.project_id, data);

    if (result === 200) {
      snackbar.success("Basic Info Updated");
      renewState();
    } else {
      snackbar.error("An Error Occurred");
    }
  };

  const addTagHandler = () => {
    let value = tagInputEl.current.value;
    if (value) setTags([...tags, value]);
  };

  const deleteTagHandler = (data: string) => {
    setTags(tags.filter((tag: any) => data !== tag));
  };

  const handleStatus = () => {
    setStatus(!status);
  };

  const submitter = {
    handleSubmit: handleSubmit,
    handler: onSubmit,
    btnName: "Update Information",
  };
  return (
    <React.Fragment>
      <Switch color="primary" checked={status} onChange={handleStatus} name="Completed" />
      <Form register={register} errors={errors} submitter={submitter}>
        <div className="c-form-row-1-2">
          <InputReq name="header_title" className="c-input" />
          <TextareaReq name="header_body" className="c-input" rows={2} />
        </div>
        <div className="c-form-row-1-2">
          <InputReq name="main_title" className="c-input" />
          <TextareaReq name="main_body" className="c-input" rows={2} />
        </div>
        <div className="c-form-row-1-2">
          <InputReq name="extra_title" className="c-input" />
          <Textarea name="extra_body" className="c-input" rows={2} />
        </div>
        <div className="c-form-row-2 grid-center">
          <Input type="file" label="Upload Image" name="img" className="c-input" />
          <ModalImage
            className="c-form-img"
            small={pageInfo.img_path}
            large={pageInfo.img_path}
          />
        </div>
        <div className="c-form-row-1-2 grid-center">
          <div className="c-form-row-2-1 grid-center">
            <div>
              <label>Tags</label>
              <input ref={tagInputEl} className="c-input" />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="btn-chip"
              onClick={addTagHandler}
            >
              Add
            </Button>
          </div>
          <div className="tags-array">
            {tags.map((tag: string, index: number) => (
              <Chip
                key={index}
                className="tags"
                label={tag}
                onDelete={() => deleteTagHandler(tag)}
                color="primary"
              />
            ))}
          </div>
        </div>
        <div className="text-danger">{tagsErr}</div>
      </Form>
    </React.Fragment>
  );
}

export default BasicTabProject;
