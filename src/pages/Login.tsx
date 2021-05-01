import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuth from "./../hooks/useAuth";
import { Form, InputReq, InputPass } from "../components/FormGroup";
import MacNav from "../components/MacNav";

import { loginActionUrl } from "./../helpers/ApiLinks";
import { fetchPostRes, succMsg, errMsg } from "./../helpers/FormHelper";

type Inputs = {
  username: string;
  password: string;
};

function Login() {
  const auth = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const result = await fetchPostRes(loginActionUrl, data);
    if (result.isAuth) {
      succMsg("Credentials Matched", () => {
        auth.signIn(result);
        history.push("/admin/dashboard");
      });
    } else {
      errMsg("Credentials Does Not Matched");
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
              <InputReq name="username"  />
              <InputPass name="password" rule={{ required: true }} />          
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
