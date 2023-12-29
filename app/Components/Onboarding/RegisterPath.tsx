import { useState } from "react";
import { Card } from "@nextui-org/react";
import HexagonFill from "../Icons/HexagonFill";
import HexagonEmpty from "../Icons/HexagonEmpty";
import CandidateRegistration from "./CandidateRegistration";
import OrganizationRegistration from "./OrganizationRegistration";
import clsx from "clsx";

const FlowPath = ({ setPathComponent }) => {
  return (
    <div className="w-full h-[100vh] m-auto flex flex-col gap-y-5 justify-center items-center">
      <div className="text-content-wrapper flex flex-col gap-y-2">
        <h2 className="header-1-600">Join Us!</h2>
        <p className="line-clamp-2 max-w-[400px] text-[#8692A6]">
          To being this journey, tell us what type of account you'd be opening
        </p>
      </div>
      <div className="path-wrapper flex flex-col gap-y-4">
        <PathCard
          icon={<HexagonFill />}
          path="candidate"
          setPathComponent={setPathComponent}
          title="Individual"
          description="Passionate candidate with a mission to crack interviews"
        />
        <PathCard
          icon={<HexagonEmpty />}
          path="organization"
          setPathComponent={setPathComponent}
          title="Hiring Manager"
          description="Looking to hire sharp candidates?"
        />
      </div>
    </div>
  );
};

const PathCard = ({ path, title, description, icon, setPathComponent }) => {
  return (
    <div tabIndex={1} onClick={() => setPathComponent(path)}>
      <Card
        shadow="none"
        className="w-[426px] h-[108px] border border-[#1565D8] p-4 cursor-pointer"
      >
        <div className="content-wrapper flex gap-x-2">
          <div className="icons-wrapper relative">{icon}</div>
          <div className="text-content flex flex-col gap-y-1 items-start">
            <span className="header-2-">{title}</span>
            <p className="text-[#8692A6]">{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const RegisterPath = ({ accountId }) => {
  const [pathComponent, setPathComponent] = useState("path");
  return (
    <div className="bg-white text-black flex w-full">
      <div className="gradient min-w-[900px] min-h-[100vh] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <div
        className={clsx(
          "w-full h-[100vh]  flex flex-col gap-y-5",
          pathComponent === "path" && "m-auto justify-center items-center"
        )}
      >
        {pathComponent === "path" && (
          <FlowPath setPathComponent={setPathComponent} />
        )}
        {pathComponent === "candidate" && (
          <CandidateRegistration accountId={accountId} setPathComponent={setPathComponent} />
        )}
        {pathComponent === "organization" && (
          <OrganizationRegistration accountId={accountId} setPathComponent={setPathComponent} />
        )}
      </div>
    </div>
  );
};

export default RegisterPath;
