"use client";

import { useEffect, useState } from "react";
import { useAnswerContext } from "../AnswerContext";
import { Chip } from "@nextui-org/react";

const AutoSave = () => {
  const [isSaveHappened, setIsSaveHappened] = useState(false);
  const { answers, onSaveHandler } = useAnswerContext();

  useEffect(() => {
    const autoSaveHandlerTimeout = setTimeout(() => {
      const isHavingAnswers = Object.keys(answers).length;
      if (isHavingAnswers) {
        onSaveHandler(() => {
          console.log("Auto save use effect");
          setIsSaveHappened(true);
          setTimeout(() => {
            setIsSaveHappened(false);
          }, 1500);
        });
      }
    }, 20000);
    return () => clearTimeout(autoSaveHandlerTimeout);
  }, [answers]);

  return (
    <Chip variant="light" color="success">
      {isSaveHappened && <p className="text-sm italic">Saved Successfully!</p>}
    </Chip>
  );
};

export default AutoSave;
