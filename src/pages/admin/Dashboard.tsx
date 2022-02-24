import React from "react";
import { useForm } from "react-hook-form";
import { Form,InputReq } from "../../components/FormGroup";
import { snackbar } from "../../components/PopupManager";
import { resumeUpdateUrl, resumeUrl } from "../../helpers/ApiLinks";
import { fetchPostRes } from "../../helpers/FormHelper";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  resume?: string;
};

function Dashboard() {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (!data.resume) delete data.resume;
    else data.resume = data.resume[0];
    const result = await fetchPostRes(resumeUpdateUrl, data, auth.user.token);
    if (result === 200) {
      snackbar.success("Resume Updated", () => {
        reset();
      });
    } else {
      snackbar.error(result);
    }
  };

  const submitter = {
    handleSubmit: handleSubmit,
    handler: onSubmit,
    btnName: "Update Resume",
  };

  return (
    <React.Fragment>
      <div className="c-card-header">Dashboard</div>
      <div className="c-card-body">
        <div className="dashboard-wrapper">
          <h3>Update Resume</h3>
          <Form register={register} errors={errors} submitter={submitter}>
            <div></div>
            <div className="c-form-row-2 items-center">
              <InputReq type="file" name="resume" className="c-input" />
              <a href={resumeUrl} target="_blank">Current Resume</a>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
