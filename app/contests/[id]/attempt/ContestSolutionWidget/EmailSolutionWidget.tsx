import RichTextEditor from "@/app/Components/Editor/RichTextEditor";
import { useState } from "react";

const EmailSolutionWidget = ({ questionDetails }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  console.log("entered email", enteredEmail);
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
