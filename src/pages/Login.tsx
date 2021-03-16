import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuth from "./../hooks/useAuth";
import { Form, Input, InputPass } from "../components/FormGroup";
import MacNav from "../components/MacNav";

import { loginActionUrl } from "./../helpers/ApiLinks";
import {
  fetchPostResopnse,
  successPopUp,
  errorPopUp,
} from "./../helpers/FormHelper";

type Inputs = {
  username: string;
  password: string;
};

function Login() {
  const auth = useAuth();
  const history = useHistory();
  const methods = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const result = await fetchPostResopnse(loginActionUrl, data);
    if (result.isAuth) {
      successPopUp("Credentials Matched", () => {
        auth.signIn(result);
        history.push("/admin/dashboard");
      });
    } else {
      errorPopUp("Credentials Does Not Matched");
    }
  };

  return (
    <div>
      <MacNav />

      <div className="section-secondary">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="title-lg text-center">Enter Your Credentials</div>
            <Form formMethods={methods} handler={onSubmit} submitBtn="Submit">
              <Input name="username" rule={{ required: true }} />
              <InputPass name="password" rule={{ required: true }} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
