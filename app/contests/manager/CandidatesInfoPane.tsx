import Phone from "@/app/Components/Icons/Phone";
import Sms from "@/app/Components/Icons/Sms";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";

const AdditionalInfo = ({ title, value, Icon = <Sms /> }) => {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-[#f4f4f5] rounded-[40px] flex">
        <div className="m-auto">{Icon}</div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="header-3-600">{title}</div>
        <h3 className="header-3-600 truncate max-w-[100px]">{value}</h3>
      </div>
    </div>
  );
};
const CandidateInfo = ({ candidate }) => {
  const { feedback } = candidate || {};
  return (
    <div className="flex flex-col gap-y-12">
      <Card
        isBlurred
        shadow="sm"
        className="border-none p-3 min-h-[95vh]"
        radius="sm"
      >
        <CardHeader>
          <h1 className="header-1-600">Candidate Details</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-y-4">
          <div className="wrapper gap-y-2 flex-col flex items-center w-full">
            <Avatar src={candidate?.avatar_url} size="lg"></Avatar>
            <h3 className="header-3-600">{candidate?.name}</h3>
          </div>
          <div className="additional-info flex gap-x-8">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#f4f4f5] rounded-[40px] flex">
                <div className="m-auto">
                  <Sms />
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="header-3-600">Email</div>
                <h3 className="header-3-600 overflow-hidden truncate max-w-[90px]">
                  {candidate?.email}
                </h3>
              </div>
            </div>
            <AdditionalInfo
              title="Phone"
              value={candidate?.phone_number || "--"}
              Icon={<Phone />}
            />
          </div>
          {feedback && (
            <div className="feedback">
              <h3 className="header-1-600 underline mb-4">Overall Feedback</h3>
              <div className="flex flex-col gap-y-4 mb-4">
                <div className="sections">
                  <h3 className="header-2-600 text-[#3B4854]">
                    Overall Score:<span className="ml-2">{feedback.score}</span>
                  </h3>
                </div>
                <div className="sections">
                  <h3 className="header-2-600 text-[#3B4854]">
                    Language Proficiency:
                    <span className="ml-2">
                      {feedback.language_proficiency}
                    </span>
                  </h3>
                </div>
                <div className="sections">
                  <h3 className="header-2-600 text-[#3B4854]">
                    Tone Feedback:
                    <span className="ml-2">{feedback.tone_feedback}</span>
                  </h3>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
const CandidatesInfoPane = ({ candidate }) => {
  return (
    <div>
      <CandidateInfo candidate={candidate} />
    </div>
  );
};

export default CandidatesInfoPane;
