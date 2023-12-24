"use client";
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  UseFormRegister,
  useForm,
} from "react-hook-form";

const FormPane = ({
  formTitle,
  submitHandler,
  form,
}: {
  formTitle: string;
  submitHandler: (data: any) => void;
  form: (register: UseFormRegister<FieldValues>) => JSX.Element;
}) => {
  const methods = useForm();
  return (
    <div className="flex flex-col w-full pl-8 pr-[308px] relative">
      <h3 className="header-2-600 my-5">{formTitle}</h3>
      <section className="bg-[#FFFFFF] flex-1 pb-20">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            {form(methods.register)}
            <footer className="absolute">
              <Button type="submit">Cancel</Button>
              <Button className="primary" type="submit">
                Submit
              </Button>
            </footer>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};
const InfoPane = ({ children }: { children: ReactNode }) => (
  <section className="bg-[#EAEEF2] min-w-[413px]">{children}</section>
);
const FormWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex  gap-[18px]">{children}</div>;
};

FormWrapper.FormPane = FormPane;
FormWrapper.InfoPane = InfoPane;

const FormLayout = ({
  form,
  infoContent,
  formTitle,
  submitHandler,
}: {
  form: (register: UseFormRegister<FieldValues>) => JSX.Element;
  infoContent: ReactNode;
  formTitle: string;
  submitHandler: (data: any) => void;
}) => {
  return (
    <FormWrapper>
      <FormWrapper.FormPane
        formTitle={formTitle}
        submitHandler={submitHandler}
        form={form}
      />
      <FormWrapper.InfoPane>
        <div className="pl-4 pt-4">{infoContent}</div>
      </FormWrapper.InfoPane>
    </FormWrapper>
  );
};

export default FormLayout;
