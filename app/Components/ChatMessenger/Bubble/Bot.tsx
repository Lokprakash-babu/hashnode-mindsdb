import { FaUserAstronaut } from "react-icons/fa6";

const Bot = ({ message }) => {
  return (
    <div className="flex items-start gap-2.5">
      <FaUserAstronaut size={25} />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-[#1C658C]  rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-sm font-normal text-white"> {message}</p>
        </div>
      </div>
    </div>
  );
};

export default Bot;
