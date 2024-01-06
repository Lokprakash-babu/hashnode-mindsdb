import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { RoleChip, StatusChip } from "../Components/ContestCard";
import EditContestForm from "@/app/Components/Forms/EditContestForm";
import moment from "moment";

const InfoCard = ({ details }) => {
  return (
    <div className="flex flex-col gap-y-12">
      <Card isBlurred shadow="sm" className="border-none p-3" radius="sm">
        <CardHeader>
          <h1 className="header-1-600">Contest Info</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-y-4">
          <h3 className="header-2-600">{details.id}</h3>
          <div className="flex gap-3">
            <RoleChip>{details.role}</RoleChip>
            <StatusChip status={details.status} />
          </div>
          <div className="flex flex-col gap-y-3 text-md">
            <p>
              Start date:{" "}
              <span className="text-md-500">
                {moment.unix(details.start_date).format("DD-MM-YYYY")}
              </span>
            </p>
            <p>
              End date:{" "}
              <span className="text-md-500">
                {moment.unix(details.end_date).format("DD-MM-YYYY")}
              </span>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const EditForm = ({ details }) => {
  const isContestStarted = moment(details.start_date).isBefore(
    moment(new Date()).unix()
  );
  return (
    <Card isBlurred shadow="sm" className="border-none p-3 w-full" radius="sm">
      <CardHeader>
        <h1 className="header-1-600">Properties</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-y-4">
        <EditContestForm details={details} disableForm={isContestStarted}/>
      </CardBody>
    </Card>
  );
};
const SideDetailsPane = ({ details }) => {
  return (
    <>
      <InfoCard details={details} />
      <EditForm details={details} />
    </>
  );
};

export default SideDetailsPane;
