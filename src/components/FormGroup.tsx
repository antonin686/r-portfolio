import React from "react";
import { Button } from "@material-ui/core";

interface IformProps {
  children: any;
  register: any;
  errors: any;
  submitter?: any;
}
const Form = ({ children, register, errors, submitter, ...rest }: IformProps) => {
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
  const CreateInputs = ({ children, ...rest }: any) => (
    <div {...rest}>
      {Array.isArray(children)
        ? children.map((child: any, index: any) => {
            return child.props.name ? (
              <ProcessedInput key={index} child={child} />
            ) : typeof child.props.children === "object" ? (
              <CreateInputs
                {...child.props}
                key={index}
                children={child.props.children}
              />
            ) : (
              child
            );
          })
        : children && <ProcessedInput child={children} />}
    </div>
  );
  const ProcessedInput = ({ child }: any) => (
    <div>
      {child.props?.name ? (
        <React.Fragment>
          <label htmlFor={child.props.name} className="c-label">
            {child.props.label
              ? (label = child.props.label)
              : (label = convLabel(child.props.name))}
          </label>
          {React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props.name,
            },
          })}
          {errors[child.props.name] && (
            <div className="text-danger">
              *
              {errors[child.props.name].message
                ? errors[child.props.name].message
                : `${label} is required`}
            </div>
          )}
        </React.Fragment>
      ) : (
        child
      )}
    </div>
  );

  return (
    <form onSubmit={submitter.handleSubmit(submitter.handler)} {...rest}>
      {Array.isArray(children) ? <CreateInputs children={children} /> : children}
      {submitter.btnName && (
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className="c-primary-btn"
        >
          {submitter.btnName}
        </Button>
      )}
    </form>
  );
};

const Input = ({ register, name, label, rule, ...rest }: any) => {
  return <input {...register(name, rule)} {...rest} />;
};

const InputPass = ({ register, name, label, rule, ...rest }: any) => {
  return <input type="password" {...register(name, rule)} {...rest} />;
};

const InputReq = ({ register, name, label, rule, ...rest }: any) => {
  if (!rule) {
    rule = { required: true };
  }
  return <input {...register(name, rule)} {...rest} />;
};

const Textarea = ({ register, name, label, rule, ...rest }: any) => {
  return <textarea {...register(name, rule)} {...rest}></textarea>;
};

const TextareaReq = ({ register, name, label, ...rest }: any) => {
  let rule = { required: true };
  return <textarea {...register(name, rule)} {...rest}></textarea>;
};

const InputFileReq = ({ register, name, label, ...rest }: any) => {
  let rule = { required: true };
  return <input type="file" {...register(name, rule)} {...rest} />;
};

export { Form, Input, InputPass, InputReq, Textarea, TextareaReq, InputFileReq };
