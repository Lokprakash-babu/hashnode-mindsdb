"use client";
import { Spinner } from "@nextui-org/react";

const Loading = () => {
  console.log("Loading comp");
  return (
    <div className="bg-white layout flex justify-center items-center w-full h-full">
      <div>
        <Spinner
          label="We are curating your content!"
          color="primary"
          labelColor="primary"
        />
      </div>
    </div>
  );
};

export default Loading;
