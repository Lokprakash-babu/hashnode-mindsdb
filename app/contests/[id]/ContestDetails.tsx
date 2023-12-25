"use client";
import Trophy from "@/app/Components/Icons/Trophy";
import { HIRING_MANAGER_TABS } from "./constants";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import Markdown from "react-markdown";
import { RoleChip, StatusChip } from "../Components/ContestCard";
import DateFormatter from "@/app/utils/dateFormatter";
import CreateContestForm from "@/app/Components/Forms/CreateContestForm";
import EditContestForm from "@/app/Components/Forms/EditContestForm";
import Toast from "@/app/Components/Toasts/Toast";

const DescriptionCard = ({ title, content }) => {
  return (
    <Card isBlurred shadow="sm" className="border-none p-3" radius="sm">
      <CardHeader>
        <h1 className="header-1-600">{title}</h1>
      </CardHeader>
      <CardBody>
        <Markdown>{content}</Markdown>
      </CardBody>
    </Card>
  );
};

const DetailsSection = ({ details }) => {
  return (
    <div className="pr-12 flex flex-col gap-y-12">
      <DescriptionCard title="Description" content={details.description} />
      <DescriptionCard
        title="Job Description"
        content={details.job_description}
      />
    </div>
  );
};

const InfoCard = ({ details }) => {
  return (
    <div className="flex flex-col gap-y-12">
      <Card isBlurred shadow="sm" className="border-none p-3" radius="sm">
        <CardHeader>
          <h1 className="header-1-600">Info</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-y-4">
          <h3 className="header-2-600">{details.id}</h3>
          <div className="flex gap-3">
            <RoleChip>{details.role}</RoleChip>
            <StatusChip status={details.status} />
          </div>
          <div className="flex flex-col gap-y-3">
            <span>Start date: {DateFormatter(details.start_date)}</span>
            <span>End date: {DateFormatter(details.end_date)}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const EditForm = ({ details }) => {
  return (
    <Card isBlurred shadow="sm" className="border-none p-3 w-full" radius="sm">
      <CardHeader>
        <h1 className="header-1-600">Properties</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-y-4">
        <EditContestForm details={details} />
      </CardBody>
    </Card>
  );
};

const CandidatesSection = () => {
  return <>Candidates</>;
};

const LeaderBoard = () => {
  return <>Leaderboard</>;
};
const TAB_MAPPING = {
  details: DetailsSection,
  candidates: CandidatesSection,
  leaderBoard: LeaderBoard,
};

const ContestDetails = ({ details }) => {
  return (
    <div className="contest-details-wrapper flex text-black">
      <div className="details-pane  h-[100vh]  flex-1">
        <div className="details-header py-4 px-8 flex flex-col gap-y-6">
          <div className="flex gap-x-4 items-center">
            <Trophy />
            <div className="flex flex-col gap-y-2">
              <h2 className="header-2-600">{details.title}</h2>
              <h3 className="header-3-600">{details.description}</h3>
            </div>
          </div>
          <Tabs variant="underlined" aria-label="Tabs variants">
            {HIRING_MANAGER_TABS.map((tab) => (
              <Tab {...tab} key={tab.key} className="cursor-pointer">
                {TAB_MAPPING[tab.key]({ details })}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
      <div className="edit-form-pane bg-[#EAEEF2] h-[100vh] w-[366px] p-[17px] flex flex-col gap-y-6">
        <InfoCard details={details} />
        <EditForm details={details} />
      </div>
      <Toast />
    </div>
  );
};

export default ContestDetails;
