import RichTextEditor from "@/app/Components/Editor/RichTextEditor";
import { useEffect, useState } from "react";
import { useAnswerContext } from "../AnswerContext";

const EmailSolutionWidget = ({ onChange, questionKey }) => {
  const { answers } = useAnswerContext();
  const [enteredEmail, setEnteredEmail] = useState(
    answers[questionKey]?.value || ""
  );
  useEffect(() => {
    onChange(enteredEmail);
  }, [enteredEmail]);
  return (
    <div>
      <RichTextEditor
        field={{
          value: enteredEmail,
          onChange: (event) => {
            setEnteredEmail(event);
          },
        }}
      />
    </div>
  );
};

export default EmailSolutionWidget;
