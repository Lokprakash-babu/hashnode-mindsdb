import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  CardFooter,
  Avatar,
  Button,
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
      <Card className="!rounded-lg bg-[#fff]">
        <CardHeader>
          <div className="contest-card-header flex justify-between items-center w-full">
            <div className="title-wrapper flex flex-col gap-y-3">
              <h3 className="header-2-600">
                {contest.title} - {contest.id}
              </h3>
              <RoleChip>{contest.role}</RoleChip>
            </div>
            <StatusChip status={contest.status} />
          </div>
        </CardHeader>
        <CardBody>
          <article className="line-clamp-5">{contest.job_description}</article>
          <Divider className="my-3 bg-[#EBEFF3]" />
        </CardBody>
        <CardFooter>
          <div className="footer wrapper flex  justify-between w-full">
            <div className="flex w-[200.85px] h-7 pl-1 pr-3 py-1  bg-gradient-to-b from-neutral-100 to-gray-100 rounded-3xl justify-center items-center gap-2 ">
              <div className="avatar-group flex -space-x-2 hover:-space-x-0 transition ease-in-out delay-150 cursor-pointer">
                <Avatar
                  src="https://i.pravatar.cc/150?u=fdfedffd"
                  size="sm"
                  className="w-5 h-5"
                ></Avatar>
                <Avatar
                  src="https://i.pravatar.cc/150?u=ffgwedfd"
                  size="sm"
                  className="w-5 h-5"
                ></Avatar>
                <Avatar
                  src="https://i.pravatar.cc/150?u=fdfdfgrfd"
                  size="sm"
                  className="w-5 h-5"
                ></Avatar>
              </div>
              <div>{contest.candidate_count} Candidate/s</div>
            </div>
            <Button
              href={`/contests/${contest.id}`}
              as={Link}
              className="rounded-md"
              color="primary"
              variant="ghost"
            >
              View Challenge
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContestCard;
