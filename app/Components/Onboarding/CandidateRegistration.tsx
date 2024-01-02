import Toast from "../Toasts/Toast";
import BackArrow from "../Icons/BackArrow";
import AccountRegistrationForm from "../Forms/AccountRegistrationForm";
import FileUpload from "../FileUpload/FileUpload";
import { useState } from "react";
import Button from "../Buttons";

const CandidateRegistration = ({ setPathComponent, accountId }) => {
  const [resumeFileUrl, setResumeFileUrl] = useState("");
  return (
    <div className="p-10 flex flex-col gap-y-10 h-[100vh] overflow-y-auto">
      <div className="header-wrapper">
        <Button
          variant="light"
          radius="sm"
          onClick={() => setPathComponent("path")}
        >
          <BackArrow /> Back
        </Button>
      </div>
      <div className="form-wrapper m-auto flex flex-col gap-y-6 ">
        <div className="wrapper flex flex-col gap-y-2">
          <h1 className="header-1-400">Register Individual Account!</h1>
          <p className="text-[#8692A6] line-clamp-2">
            For the purpose of industry regulation, your details are required.
          </p>
        </div>
        <FileUpload
          setFileUrl={(url) => {
            setResumeFileUrl(url);
          }}
        />
        <AccountRegistrationForm
          accountId={accountId}
          resumeFileUrl={resumeFileUrl}
        />
      </div>
      <Toast />
    </div>
  );
};

export default CandidateRegistration;
