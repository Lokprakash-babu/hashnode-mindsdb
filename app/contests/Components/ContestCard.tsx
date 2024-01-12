import Button from "@/app/Components/Buttons";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  CardFooter,
  Link,
} from "@nextui-org/react";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import Markdown from "react-markdown";
export const CONTEST_STATUS_MAPPING = {
  upcoming: {
    color: "warning",
    label: "Yet to start",
  },
  "in-progress": {
    color: "primary",
    label: "Active",
  },
  completed: {
    color: "success",
    label: "Completed",
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

const ContestCard = ({ contest, isCandidate = false }) => {
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
          <article className="line-clamp-5">
          <Markdown>{removeHtmlTags(contest.job_description)}</Markdown>
          </article>
          <Divider className="my-3 bg-[#EBEFF3]" />
        </CardBody>
        <CardFooter>
          <div className="footer wrapper flex  justify-end w-full">
            {!isCandidate && (
              <Button
                href={`/contests/${contest.id}`}
                as={Link}
                className="rounded-md"
                color="primary"
              >
                View Challenge
              </Button>
            )}
            {contest.status === "in-progress" && isCandidate && (
              <Button
                href={`/contests/${contest.id}`}
                as={Link}
                className="rounded-md"
                color="primary"
              >
                View Challenge
              </Button>
            )}
            {contest.status === "completed" && isCandidate && (
              <Button
                className="rounded-md !cursor-not-allowed"
                color="secondary"
                isDisabled
                disabled
              >
                Contest Ended
              </Button>
            )}
            {contest.status === "upcoming" && isCandidate && (
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
