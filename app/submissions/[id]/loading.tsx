import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner
        label="We are fetching your submission"
        color="primary"
        labelColor="primary"
      />
    </div>
  );
};

export default Loading;
