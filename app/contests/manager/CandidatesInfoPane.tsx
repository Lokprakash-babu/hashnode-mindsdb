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
        <h3 className="header-3-600">{value}</h3>
      </div>
    </div>
  );
};
const CandidateInfo = ({ candidate }) => {
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
          <div className="additional-info flex gap-x-8 justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#f4f4f5] rounded-[40px] flex">
                <div className="m-auto">
                  <Sms />
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="header-3-600">Email</div>
                <h3 className="header-3-600">{candidate?.email}</h3>
              </div>
            </div>
            <AdditionalInfo
              title="Phone"
              value={candidate?.phone_number || "--"}
              Icon={<Phone />}
            />
          </div>
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
