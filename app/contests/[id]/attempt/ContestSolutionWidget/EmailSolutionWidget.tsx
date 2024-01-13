"use client";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useAnswerContext } from "../AnswerContext";
import ReactQuill from "react-quill";

const EmailSolutionWidget = ({ onChange, questionKey }) => {
  const { answers } = useAnswerContext();
  const [enteredEmail, setEnteredEmail] = useState(
    answers[questionKey]?.value || ""
  );
  useEffect(() => {
    onChange(enteredEmail);
  }, [enteredEmail]);
  return (
    <>
      <ReactQuill
        theme="snow"
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

      <p className="mt-4 text-sm">
        No of characters: {enteredEmail.replaceAll("\n", "")}
      </p>
    </>
  );
};

export default EmailSolutionWidget;
