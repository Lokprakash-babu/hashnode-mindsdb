"use client";
import Trophy from "@/app/Components/Icons/Trophy";
import moment from "moment";
import { HIRING_MANAGER_TABS } from "../[id]/constants";
import { CANDIDATE_TABS, HIRING_MANAGER_TABS } from "../[id]/constants";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Accordion,
  AccordionItem,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Markdown from "react-markdown";
import Toast from "@/app/Components/Toasts/Toast";
import { useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { LeaderBoard } from "../Components/LeaderBoard";
import SideDetailsPane from "./SideDetailsPane";
import CandidatesInfoPane from "./CandidatesInfoPane";
import RightArrow from "@/app/Components/Icons/RightArrow";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import ChatBubble from "@/app/Components/ChatBubble";
import EditPen from "@/app/Components/Icons/EditPen";
import ActionMenu from "@/app/Components/Icons/ActionMenu";
import QuestionsEditForm from "@/app/Components/Forms/QuestionsEditForm";
import BackArrow from "@/app/Components/Icons/BackArrow";
import StartContestBtn from "../[id]/attempt/StartContestBtn";
import useAccountContext from "@/app/hooks/useAccountContext";
import { useAuth } from "@clerk/nextjs";

const TYPE_MAPPING = {
  bot_conversation: "Bot Conversation",
  email: "Email",
};

const DescriptionCard = ({ title, content }) => {
  return (
    <Card
      isBlurred
      shadow="sm"
      className="border p-3 rounded-lg bg-[#E6F0FE] border-[#B0D5FC]"
      radius="sm"
    >
      <CardHeader>
        <h1 className="header-2-600">{title}</h1>
      </CardHeader>
      <CardBody>
        <Markdown>{removeHtmlTags(content)}</Markdown>
      </CardBody>
    </Card>
  );
};

const DetailsSection = ({ details, userType }) => {
  const questions = details.questions;
  const [editForm, showEditForm] = useState(false);
  const isContestStarted = moment(details.start_date).isBefore(
    moment(new Date()).unix()
  );
  return (
    <div className="pr-12 flex flex-col gap-y-12">
      <DescriptionCard title="Description" content={details.description} />
      <DescriptionCard
        title="Job Description"
        content={details.job_description}
      />
      {userType === "hiring_manager" && (
        <div className="questions-wrapper flex flex-col gap-y-3">
          <div className="heading-wrapper flex justify-between items-center px-4">
            <h3 className="underline">Contest Questions</h3>
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <ActionMenu />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
              >
                {!editForm ? (
                  <DropdownItem
                    onClick={() => showEditForm(true)}
                    className="text-black"
                    key="edit"
                    startContent={<EditPen />}
                  >
                    Edit
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => showEditForm(false)}
                    className="text-black"
                    key="edit"
                    startContent={<BackArrow />}
                  >
                    Back
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
          {!editForm ? (
            <Accordion variant="splitted">
              {Object.keys(questions).map((question: any) => {
                return (
                  <AccordionItem
                    className="!shadow-none !bg-[#FDEBE0]"
                    indicator={<RightArrow />}
                    key={question}
                    aria-label="Accordion 1"
                    title={
                      <div className="w-full px-1">
                        <div className="wrapper flex justify-between items-center">
                          <h1 className="header-2-400">
                            {questions[question].title}
                          </h1>

                          <div className="pill-info flex gap-x-2">
                            {questions[question].tone && (
                              <Chip
                                variant="flat"
                                color="secondary"
                                className="capitalize rounded-full"
                              >
                                {questions[question].tone}
                              </Chip>
                            )}
                            <Chip
                              variant="flat"
                              color="primary"
                              className="capitalize rounded-full"
                            >
                              {TYPE_MAPPING[questions[question].type]}
                            </Chip>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    {questions[question].type === "bot_conversation" && (
                      <ChatBubble
                        messageContent={questions[question].initial_text}
                      />
                    )}
                    <Markdown className="p-2">
                      {removeHtmlTags(questions[question].content)}
                    </Markdown>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <QuestionsEditForm
              questions={questions}
              id={details.id}
              showEditForm={showEditForm}
            />
          )}
        </div>
      )}
    </div>
  );
};

const TAB_MAPPING = {
  details: DetailsSection,
  leaderBoard: LeaderBoard,
};

const ContestDetails = ({ details, userType }) => {
  const [candidates, setCandidates] = useState([]);
  const [tab, setTab] = useState(HIRING_MANAGER_TABS[0].key);
  const [currentCandidate, setCurrentCandidate] = useState({});
  const { account_type } = useAccountContext();

  useEffect(() => {
    requestWrapper(`contest/${details.id}/candidates`).then((response) => {
      setCandidates(response.data);
      setCurrentCandidate(response.data?.[0]);
    });
  }, [details.id]);

  //TODO: Retrive proper account type --> Done
  return (
    <div className="contest-details-wrapper flex text-black">
      <div className="details-pane  min-h-[100vh]  flex-1">
        <div className="details-header py-4 pr-8 flex flex-col gap-y-6">
          <div className="flex justify-between items-center gap-5">
            <div className="flex gap-x-4 items-start">
              <div>
                <Trophy />
              </div>
              <div className="flex flex-1 flex-col gap-y-2">
                <h2 className="header-2-600">{details.title}</h2>
                <h3 className="header-3-600">
                  <Markdown>{removeHtmlTags(details.description)}</Markdown>
                </h3>
              </div>
            </div>
            {userType === "candidate" && details.status === "in-progress" && (
              <StartContestBtn />
            )}
          </div>
          <Tabs
            onSelectionChange={(key: any) => {
              setTab(key);
            }}
            variant="underlined"
            aria-label="Tabs variants"
          >
            {userType === "hiring_manager" &&
              HIRING_MANAGER_TABS.map((tab) => (
                <Tab {...tab} key={tab.key} className="cursor-pointer">
                  {TAB_MAPPING[tab.key]({
                    details,
                    candidates,
                    setCurrentCandidate,
                    userType,
                  })}
                </Tab>
              ))}
            {userType === "candidate" &&
              CANDIDATE_TABS.map((tab) => (
                <Tab {...tab} key={tab.key} className="cursor-pointer">
                  {TAB_MAPPING[tab.key]({
                    details,
                    candidates,
                    setCurrentCandidate,
                    userType,
                  })}
                </Tab>
              ))}
          </Tabs>
        </div>
      </div>
      <div className="edit-form-pane bg-[#EAEEF2] min-h-[100vh] w-[450px] p-[17px] flex flex-col gap-y-6">
        {tab === "details" && (
          <SideDetailsPane details={details} userType={userType} />
        )}
        {tab === "leaderBoard" && (
          <CandidatesInfoPane candidate={currentCandidate} />
        )}
      </div>
      <Toast />
    </div>
  );
};

export default ContestDetails;
