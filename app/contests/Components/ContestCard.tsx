import Button from "@/app/Components/Buttons";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  CardFooter,
  Avatar,
  Link,
} from "@nextui-org/react";

export const CONTEST_STATUS_MAPPING = {
  yet_to_start: {
    color: "warning",
    label: "Yet to start",
  },
  active: {
    color: "primary",
    label: "Active",
  },
  completed: {
    color: "success",
    label: "Completed",
  },
  pending: {
    color: "default",
    label: "Pending",
  },
  hold: {
    color: "secondary",
    label: "Hold",
  },
  cancelled: {
    color: "danger",
    label: "Cancelled",
  },
};

export const RoleChip = ({ children }) => {
  return (
    <Chip color="secondary" variant="dot" className="text-ellipsis">
      {children}
    </Chip>
  );
};

export const StatusChip = ({ status }) => {
  //TODO: Implement proper chip
  return (
    <Chip radius="sm" variant="bordered">
      TODO Chip
    </Chip>
  );
  return (
    <Chip
      radius="sm"
      color={CONTEST_STATUS_MAPPING[status].color}
      variant="bordered"
    >
      {CONTEST_STATUS_MAPPING[status].label}
    </Chip>
  );
};

const ContestCard = ({ contest }) => {
  return (
    <div>
      <Card className="!rounded-lg bg-[#fff] h-full">
        <CardHeader>
          <div className="contest-card-header flex justify-between items-center w-full">
            <div className="title-wrapper flex flex-col gap-y-3">
              <h3 className="header-2-600">
                {contest.title} - {contest.id}
              </h3>
              <RoleChip>{contest.role}</RoleChip>
            </div>
            {/* <StatusChip status={contest.status} /> */}
          </div>
        </CardHeader>
        <CardBody>
          <article className="line-clamp-5">{contest.job_description}</article>
          <Divider className="my-3 bg-[#EBEFF3]" />
        </CardBody>
        <CardFooter>
          <div className="footer wrapper flex  justify-between w-full">
            {contest.status === "in-progress" && (
              <Button
                href={`/contests/${contest.id}`}
                as={Link}
                className="rounded-md"
                color="primary"
              >
                View Challenge
              </Button>
            )}
            {contest.status === "completed" && (
              <Button
                className="rounded-md !cursor-not-allowed"
                color="secondary"
                isDisabled
                disabled
              >
                Contest Ended
              </Button>
            )}
            {contest.status === "upcoming" && (
              <Button
                className="rounded-md !cursor-not-allowed"
                color="secondary"
                disabled
                isDisabled
              >
                Yet to start!
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContestCard;
