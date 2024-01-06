import { Skeleton, Spinner } from "@nextui-org/react";

const UserContextLoader = () => {
  const noOfCards = 3;
  return (
    <div className="bg-white flex w-full h-full">
      <div className="sidebar-skeleton">
        <Skeleton>
          <div className="h-screen bg-default-300 w-[76px]"></div>
        </Skeleton>
      </div>
      <div className="content-container flex-1">
        <div className="header-skeleton ">
          <Skeleton>
            <div className="h-[60px] bg-default-300 w-full"></div>
          </Skeleton>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <Spinner
            label="We are curating your content!"
            color="primary"
            labelColor="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default UserContextLoader;
