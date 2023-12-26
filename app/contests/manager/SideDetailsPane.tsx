import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { RoleChip, StatusChip } from "../Components/ContestCard";
import DateFormatter from "@/app/utils/dateFormatter";
import EditContestForm from "@/app/Components/Forms/EditContestForm";

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
const SideDetailsPane = ({ details }) => {
  return (
    <>
      <InfoCard details={details} />
      <EditForm details={details} />
    </>
  );
};

export default SideDetailsPane;
