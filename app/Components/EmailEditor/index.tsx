"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import EmailFooter from "./EmailFooter";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export interface IEmailEditor {
  onSubmit?: (val: any) => any;
  initialValue?: string;
}
const EmailEditor = (props: IEmailEditor) => {
  const [emailValue, setEmailValue] = useState(props.initialValue || "");

  const [onlyTextContent, setOnlyTextContent] = useState("");
  return (
    <>
      <QuillNoSSRWrapper
        theme="snow"
        readOnly={!!props.initialValue}
        style={{
          minHeight: "70vh",
          maxHeight: "70vh",
        }}
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
        value={emailValue}
        onChange={(enteredValue, delta, source, editor) => {
          const textContent = editor.getText().replaceAll("\n", "");
          setOnlyTextContent(textContent);
          setEmailValue(enteredValue);
        }}
      />
      {!!props.onSubmit && (
        <EmailFooter
          textContent={onlyTextContent}
          onClick={() => {
            if (
              onlyTextContent.length >= 250 &&
              onlyTextContent.length <= 500
            ) {
              props?.onSubmit?.({
                email: {
                  formattedContent: emailValue,
                  unFormattedContent: onlyTextContent,
                },
              });
            } else {
              const title =
                onlyTextContent.length > 500
                  ? "Email Content is too long"
                  : "Email Content is too short";
            }
          }}
        />
      )}
    </>
  );
};

export default EmailEditor;
