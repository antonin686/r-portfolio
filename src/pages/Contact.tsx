import { useForm } from "react-hook-form";

import { Form, Input, Textarea } from "../components/FormGroup";
import { contactActionUrl } from "../helpers/ApiLinks";
import MacNav from "../components/MacNav";
import {
  fetchPostResopnse,
  successPopUp,
  errorPopUp,
} from "../helpers/FormHelper";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function Contact() {
  const methods = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    const result = await fetchPostResopnse(contactActionUrl, data);
    if (result === 200) {
      successPopUp("Your Message Has Been Sent", () => {
        methods.reset();
      });
    } else {
      errorPopUp("An Error Occurred");
    }
  };

  return (
    <div>
      <MacNav />

      <div className="section-secondary">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="title-lg text-center">Get In Touch</div>
            <Form formMethods={methods} handler={onSubmit} submitBtn="Send">
              <Input name="name" rule={{ required: true }} />
              <Input
                name="email"
                rule={{
                  required: true,
                  pattern: { value: /^\S+@\S+$/i, message: "Email is invalid" },
                }}
              />
              <Input name="subject" />
              <Textarea name="message" rule={{ required: true }} row={5} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
