import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Chip, Button, Breadcrumbs } from "@material-ui/core";
import { Form, InputReq, Textarea, TextareaReq } from "./../../components/FormGroup";
import MacNav from "./../../components/MacNav";
import Sidebar from "./../../components/Sidebar";
import { fetchPostRes } from "../../helpers/FormHelper";
import { projectsCreateUrl } from "../../helpers/ApiLinks";
import { snackbar } from "../../components/PopupManager";

type Inputs = {
  header_title: string;
  header_body: string;
  main_title: string;
  main_body: string;
  extra_title: string;
  extra_body: string;
  image: any;
  tags?: string;
};

function Create() {
  const history = useHistory();
  const tagInputEl = useRef<any>();
  const [tags, setTags] = useState<string[] | []>([]);
  const [tagsErr, setTagsErr] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      main_title: "About The Project",
      extra_title: "Technologies",
    },
  });
  const onSubmit = async (data: Inputs) => {
    if (!tags.length) {
      setTagsErr("*At least 1 tag needed");
      return;
    } else setTagsErr(null);
    let conTags = tags.join("|");
    data.tags = conTags;
    data.image = data.image[0];
    const result = await fetchPostRes(projectsCreateUrl, data);

    if (result === 200) {
      snackbar.success("Project Successfully Added", () => {
        history.push("/admin/projects");
      });
    } else {
      snackbar.error(result);
    }
  };
  const addTagHandler = () => {
    let value = tagInputEl.current.value;
    if (value) setTags([...tags, value]);
  };

  const deleteTagHandler = (data: string) => {
    setTags(tags.filter((tag) => data !== tag));
  };

  const submitter = {
    handleSubmit: handleSubmit,
    handler: onSubmit,
    btnName: "Create New Project",
  };
  return (
    <div>
      <MacNav />
      <div className="container">
        <div className="main-wrapper">
          <div>
            <Sidebar />
          </div>
          <div className="c-card">
            <div className="c-card-header">Create Project</div>
            <div className="c-card-body c-tab-wrapper">
              <div className="c-breadcrumbs">
                <Breadcrumbs>
                  <Link to="/admin/projects">Projects</Link>
                  <div className="text-secondary">Create</div>
                </Breadcrumbs>
              </div>
              <div className="c-form">
                <Form register={register} errors={errors} submitter={submitter}>
                  <div className="c-form-row-1-2">
                    <InputReq name="header_title" className="c-input" />
                    <TextareaReq name="header_body" className="c-input" rows={1} />
                  </div>
                  <div className="c-form-row-1-2">
                    <InputReq name="main_title" className="c-input" />
                    <TextareaReq name="main_body" className="c-input" rows={1} />
                  </div>
                  <div className="c-form-row-1-2">
                    <InputReq name="extra_title" className="c-input" />
                    <Textarea name="extra_body" className="c-input" rows={1} />
                  </div>
                  <div className="c-form-row-2 grid-center">
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
                  <div className="c-form-row-2 grid-center">
                    <InputReq type="file" name="image" className="c-input" />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
