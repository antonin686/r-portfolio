import React from "react";
interface IformProps {
  children: any;
  register: any;
  errors: any;
  submitter: any;
}
const Form = ({
  children,
  register,
  errors,
  submitter,
  ...rest
}: IformProps) => {
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
      {children.map((child: any, index: any) => {
        return child.props.name ? (
          <ProcessedInput key={child.props.name} child={child} />
        ) : Array.isArray(child.props.children) ? (
          <CreateInputs
            {...child.props}
            key={index}
            children={child.props.children}
          />
        ) : (
          child
        );
      })}
    </div>
  );
  const ProcessedInput = ({ child }: any) => (
    <div>
      <label htmlFor={child.props.name}>
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
    </div>
  );

  return (
    <form onSubmit={submitter.handleSubmit(submitter.handler)} {...rest}>
      {Array.isArray(children) ? (
        <CreateInputs children={children} />
      ) : (
        children
      )}
      {submitter.btnName && <button type="submit">{submitter.btnName}</button>}
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

export { Form, Input, InputPass, InputReq, Textarea, TextareaReq };
