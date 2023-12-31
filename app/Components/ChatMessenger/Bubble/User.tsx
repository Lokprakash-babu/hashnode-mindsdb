import { RiCustomerService2Fill } from "react-icons/ri";

const User = ({ message }) => {
  return (
    <div className="flex items-start gap-2.5 float-right">
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-[#398AB9] rounded-xl rounded-tr-none dark:bg-gray-700">
          <p className="text-sm font-normal text-white"> {message}</p>
        </div>
      </div>
      <RiCustomerService2Fill size={30} />
    </div>
  );
};

export default User;

// #1C658C
// #398AB9
