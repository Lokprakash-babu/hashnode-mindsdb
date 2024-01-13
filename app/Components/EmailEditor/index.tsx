"use client";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import EmailFooter from "./EmailFooter";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import Toast from "../Toasts/Toast";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

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
        <ReactQuill
          theme="snow"
          readOnly={!!props.initialValue}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link"],
              ["clean"],
            ],
          }}
          value={enteredEmail}
          onChange={(enteredValue) => {
            setEnteredEmail(enteredValue);
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
                formattedContent: enteredEmail.replaceAll("\n", ""),
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
