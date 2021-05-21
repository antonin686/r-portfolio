import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuth from "./../hooks/useAuth";
import {snackbar} from "../components/PopupManager";
import { Form, InputReq, InputPass } from "../components/FormGroup";
import MacNav from "../components/MacNav";

import { loginActionUrl } from "./../helpers/ApiLinks";
import { fetchPostRes } from "./../helpers/FormHelper";

type Inputs = {
  username: string;
  password: string;
};

function Login() {
  const auth = useAuth();
  //const snackbar = useSnackbar();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const result = await fetchPostRes(loginActionUrl, data);
    
    if (result.isAuth) {
      snackbar.success("Credentials Matched", () => {
        auth.signIn(result);
        history.push("/admin/dashboard");
      }, 1000);
    } else {
      //snackbar.error("Credentials Does Not Matched");
    }
  };

  const submitter = {
    handleSubmit: handleSubmit,
    handler: onSubmit,
    btnName: "Login",
  };

  return (
    <div>
      <MacNav />

      <div className="section-secondary">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="title-lg text-center">Enter Your Credentials</div>
            <Form register={register} errors={errors} submitter={submitter}>
              <InputReq name="username" />
              <InputPass name="password" rule={{ required: true }} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
