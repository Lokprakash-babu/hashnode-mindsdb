"use client";
import { useState } from "react";
import EmailFooter from "./EmailFooter";
import RichTextEditor from "../Editor/RichTextEditor";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import Toast from "../Toasts/Toast";
import { toast } from "react-toastify";

export interface IEmailEditor {
  onSubmit?: (val: any) => any;
  initialValue?: {
    formattedContent: string;
    unFormattedContent: string;
  };
  isReadOnly?: boolean;
}
const EmailEditor = (props: IEmailEditor) => {
  const [enteredEmail, setEnteredEmail] = useState(
    props?.initialValue?.unFormattedContent || ""
  );

  return (
    <>
      <div className="mb-4">
        <RichTextEditor
          field={{
            value: enteredEmail,
            onChange: (event) => {
              setEnteredEmail(event);
            },
          }}
        />
      </div>
      {!!props.onSubmit && (
        <EmailFooter
          textContent={enteredEmail}
          onClick={() => {
            const formattedEmail = removeHtmlTags(enteredEmail);
            if (formattedEmail.length >= 250 && formattedEmail.length <= 500) {
              props?.onSubmit?.({
                formattedContent: formattedEmail,
                unFormattedContent: enteredEmail,
              });
            } else if (formattedEmail.length < 250) {
              toast.error("At least 250 characters should be entered");
            } else {
              toast.error("Total characters should be less than 500");
            }
          }}
        />
      )}
      <Toast />
    </>
  );
};

export default EmailEditor;
