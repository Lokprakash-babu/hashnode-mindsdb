import Toast from "../Toasts/Toast";
import { Button } from "@nextui-org/react";
import BackArrow from "../Icons/BackArrow";
import AccountRegistrationForm from "../Forms/AccountRegistrationForm";

const CandidateRegistration = ({ setPathComponent, accountId }) => {
  return (
    <div className="p-10 flex flex-col gap-y-10">
      <div className="header-wrapper">
        <Button
          variant="light"
          radius="sm"
          onClick={() => setPathComponent("path")}
        >
          <BackArrow /> Back
        </Button>
      </div>
      <div className="form-wrapper m-auto flex flex-col gap-y-6">
        <div className="wrapper flex flex-col gap-y-2">
          <h1 className="header-1-400">Register Individual Account!</h1>
          <p className="text-[#8692A6] line-clamp-2">
            For the purpose of industry regulation, your details are required.
          </p>
        </div>
        <AccountRegistrationForm accountId={accountId} />
      </div>
      <Toast />
    </div>
  );
};

export default CandidateRegistration;
