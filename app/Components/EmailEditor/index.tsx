"use client";
import { useState } from "react";
import EmailFooter from "./EmailFooter";
import RichTextEditor from "../Editor/RichTextEditor";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";

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
            // if (formattedEmail.length >= 250 && formattedEmail.length <= 500) {
            props?.onSubmit?.({
              formattedContent: formattedEmail,
              unFormattedContent: enteredEmail,
            });
            // } else {
            //   const title =
            //     enteredEmail.length > 500
            //       ? "Email Content is too long"
            //       : "Email Content is too short";
            // }
          }}
        />
      )}
    </>
  );
};

export default EmailEditor;
