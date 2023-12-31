"use client";
import { Chip } from "@nextui-org/react";
import moment from "moment";
import { useTimer } from "react-timer-hook";

const Timer = ({ endTime }) => {
  const currentTime = moment().unix();

  const timeDifference = endTime - currentTime;

  const expiryTime = new Date();
  expiryTime.setSeconds(expiryTime.getSeconds() + timeDifference);

  const { seconds, minutes, totalSeconds } = useTimer({
    expiryTimestamp: expiryTime,
    //TODO: Call contest end api
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <Chip color={totalSeconds < 600 ? "danger" : "success"} variant="dot">
      <span className="text-md font-bold">
        {minutes.toString().padStart(2, "0")}
      </span>
      :
      <span className="text-md font-bold">
        {seconds.toString().padEnd(2, "0")}
      </span>
    </Chip>
  );
};

export default Timer;
