"use client";

import { useEffect, useState } from "react";
import { useAnswerContext } from "../AnswerContext";
import { Chip } from "@nextui-org/react";
import moment from "moment";

const AutoSave = () => {
  const [lastSavedTime, setLastSavedTime] = useState(moment().unix());
  const [lastSavedSecondsToDisplay, setLastSavedSecondsToDisplay] = useState(0);
  const [isSaveHappened, setIsSaveHappened] = useState(false);
  const { answers, onSaveHandler } = useAnswerContext();
  const lastSavedTimerUpdater = () => {
    const currentTime = moment().unix();
    const differenceInSeconds = currentTime - lastSavedTime;
    setLastSavedSecondsToDisplay(differenceInSeconds);
  };

  useEffect(() => {
    const autoSaveHandlerTimeout = setTimeout(() => {
      const isHavingAnswers = Object.keys(answers).length;
      if (isHavingAnswers) {
        onSaveHandler(() => {
          console.log("Auto save use effect");
          setLastSavedTime(moment().unix());
          setIsSaveHappened(true);
        });
      }
    }, 20000);
    return () => clearTimeout(autoSaveHandlerTimeout);
  }, [answers]);
  useEffect(() => {
    const lastSavedInterval = setInterval(() => {
      if (isSaveHappened) {
        lastSavedTimerUpdater();
      }
    }, 5000);
    return () => clearInterval(lastSavedInterval);
  }, [lastSavedTime, isSaveHappened]);

  return (
    <Chip variant="light" color="success">
      <p className="text-sm italic">
        Last saved {lastSavedSecondsToDisplay} seconds ago.
      </p>
    </Chip>
  );
};

export default AutoSave;
