import "./FormGroup.css";
import React from "react";

const Form = ({ children, formMethods, handler, submitBtn }: any) => {
  let label: string = "";

  const convLabel = (name: string) => {
    let conv: string = "";

    if (name?.includes("_")) {
      let newName: string[] = name.split("_");
      let cap: string[] = [];
      newName.forEach((element) => {
        cap.push(element.charAt(0).toUpperCase() + element.slice(1));
      });
      conv = cap.join(" ");
    } else {
      conv = name?.charAt(0).toUpperCase() + name?.slice(1);
    }
    return conv;
  };

  return (
    <form onSubmit={formMethods.handleSubmit(handler)}>
      {React.Children.map(children, (child) => {
        return child.props.name ? (
          <div>
            <label htmlFor={child.props.name}>
              {child.props.label
                ? (label = child.props.label)
                : (label = convLabel(child.props.name))}
            </label>
            {React.createElement(child.type, {
              ...{
                ...child.props,
                register: formMethods.register,
                key: child.props.name,
              },
            })}
            {child.props?.rule && formMethods.errors[child.props.name] && (
              <div className="text-danger">
                *
                {formMethods.errors[child.props.name].message
                  ? formMethods.errors[child.props.name].message
                  : `${label} is required`}
              </div>
            )}
          </div>
        ) : (
          child
        );
      })}
      {submitBtn && <button type="submit">{submitBtn}</button>}
    </form>
  );
};

const DivRow = ({ children, formMethods, ...rest }: any) => {
  let label: string = "";

  const convLabel = (name: string) => {
    let conv: string = "";

    if (name?.includes("_")) {
      let newName: string[] = name.split("_");
      let cap: string[] = [];
      newName.forEach((element) => {
        cap.push(element.charAt(0).toUpperCase() + element.slice(1));
      });
      conv = cap.join(" ");
    } else {
      conv = name?.charAt(0).toUpperCase() + name?.slice(1);
    }
    return conv;
  };
  return (
    <div {...rest}>
      {React.Children.map(children, (child) => {
        return child.props.name ? (
          <div>
            <label htmlFor={child.props.name}>
              {child.props.label
                ? (label = child.props.label)
                : (label = convLabel(child.props.name))}
            </label>
            {React.createElement(child.type, {
              ...{
                ...child.props,
                register: formMethods.register,
                key: child.props.name,
              },
            })}
            {formMethods.errors[child.props.name] && (
              <div className="text-danger">
                *
                {formMethods.errors[child.props.name].message
                  ? formMethods.errors[child.props.name].message
                  : `${child.props.name} is required`}
              </div>
            )}
          </div>
        ) : (
          child
        );
      })}
    </div>
  );
};

const Input = ({ register, name, label, rule, ...rest }: any) => {
  return <input name={name} ref={register(rule)} {...rest} />;
};

const InputReq = ({ register, name, label, ...rest }: any) => {
  return <input name={name} ref={register({ required: true })} {...rest} />;
};

const Textarea = ({ register, name, label, rule, ...rest }: any) => {
  return <textarea name={name} ref={register(rule)} {...rest}></textarea>;
};

const TextareaReq = ({ register, name, label, ...rest }: any) => {
  return (
    <textarea
      name={name}
      ref={register({ required: true })}
      {...rest}
    ></textarea>
  );
};

const SubmitButton = ({ btnName, ...rest }: any) => {
  return (
    <button type="submit" {...rest}>
      {btnName}
    </button>
  );
};

export { Form, DivRow, Input, InputReq, Textarea, TextareaReq, SubmitButton };
