"use client";
import Trophy from "@/app/Components/Icons/Trophy";
import { HIRING_MANAGER_TABS } from "../[id]/constants";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import Markdown from "react-markdown";
import Toast from "@/app/Components/Toasts/Toast";
import { useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { LeaderBoard } from "../Components/LeaderBoard";
import SideDetailsPane from "./SideDetailsPane";
import CandidatesInfoPane from "./CandidatesInfoPane";

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

const TAB_MAPPING = {
  details: DetailsSection,
  leaderBoard: LeaderBoard,
};

const ContestDetails = ({ details }) => {
  const [candidates, setCandidates] = useState([]);
  const [tab, setTab] = useState(HIRING_MANAGER_TABS[0].key);
  const [currentCandidate, setCurrentCandidate] = useState({});

  useEffect(() => {
    requestWrapper(`contest/${details.id}/candidates`).then((response) => {
      setCandidates(response.data);
      setCurrentCandidate(response.data?.[0]);
    });
  }, [details.id]);
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
          <Tabs
            onSelectionChange={(key: any) => {
              setTab(key);
            }}
            variant="underlined"
            aria-label="Tabs variants"
          >
            {HIRING_MANAGER_TABS.map((tab) => (
              <Tab {...tab} key={tab.key} className="cursor-pointer">
                {TAB_MAPPING[tab.key]({
                  details,
                  candidates,
                  setCurrentCandidate,
                })}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
      <div className="edit-form-pane bg-[#EAEEF2] h-[100vh] w-[450px] p-[17px] flex flex-col gap-y-6">
        {tab === "details" && <SideDetailsPane details={details} />}
        {tab === "leaderBoard" && (
          <CandidatesInfoPane candidate={currentCandidate} />
        )}
      </div>
      <Toast />
    </div>
  );
};

export default ContestDetails;
