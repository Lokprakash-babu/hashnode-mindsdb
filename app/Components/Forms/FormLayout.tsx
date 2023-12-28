"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
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
  form: (register: UseFormRegister<FieldValues>, control: any) => JSX.Element;
}) => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <h3 className="header-2-600 my-5 pl-8">{formTitle}</h3>
      <section className="bg-[#FFFFFF] flex-1 pb-5 relative">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <div className="fields-wrapper pr-[308px] pl-8 pb-10">
              {form(methods.register, methods.control)}
            </div>
            <footer className="l-0  px-6 py-10 flex justify-end w-full bg-[#FFFFFF] z-10 gap-x-3 sticky bottom-1 shadow-formFooterShadow">
              <Button
                onClick={() => {
                  router.back();
                }}
                className="bg-white rounded-md border border-[#C9D3DB]"
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="rounded-md  border-[#12344D] !opacity-100 text-white bg-primary-btn-gradient min-w-[120px] min-h-8 px-6 py-1.5 hover:!bg-[#12334C] hover:opacity-100 active:!opacity-100"
                type="submit"
              >
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
  return <div className="w-full flex">{children}</div>;
};

FormWrapper.FormPane = FormPane;
FormWrapper.InfoPane = InfoPane;

const FormLayout = ({
  form,
  infoContent,
  formTitle,
  submitHandler,
}: {
  form: (register: UseFormRegister<FieldValues>, control: any) => JSX.Element;
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
