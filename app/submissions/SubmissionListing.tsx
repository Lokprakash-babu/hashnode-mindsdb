"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const tableColumn = [
  {
    key: "submission_id",
    uid: "submission_id",
    label: "Submission",
  },
  {
    key: "problem_id",
    uid: "problem_id",
    label: "Contest/Practice(#)",
  },
  {
    key: "score",
    uid: "score",
    label: "Score",
  },
  {
    key: "feedback",
    uid: "feedback",
    label: "Feedback",
  },
];

const renderCell = (item, columnKey: string, pageType: string) => {
  switch (columnKey) {
    case "feedback":
      const parsedFeedback = item[columnKey];
      //TODO: Add truncated feedback
      // const feedbackLength = item[columnKey].length;
      return <p>{parsedFeedback?.tone_feedback || ""}</p>;
    case "score":
      return <p>{item[columnKey]}</p>;
    case "submission_id":
    case "problem_id":
      const link =
        columnKey === "submission_id"
          ? { text: "View Submission", href: `/submissions/${item[columnKey]}` }
          : {
              text: "View Problem",

              href:
                pageType === "practice"
                  ? `/practice/${item[columnKey]}`
                  : `/contests/${item[columnKey]}`,
            };
      return (
        <Link href={link.href} className="text-blue underline">
          {link.text}
        </Link>
      );
  }
};

const SubmissionList = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmission] = useState<{
    id: string;
    entity_id: string;
    score: string;
    feedback: string;
    //@ts-ignore
  }>([]);
  useEffect(() => {
    setIsLoading(true);
    requestWrapper(`submissions?type=${type}`)
      .then((submission) => {
        setSubmission(submission.message);
      })
      .catch((err) => {
        console.log("error in getting submissions", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [type]);
  const modifiedSubmissionList =
    //@ts-ignore
    submissions.map((submission) => {
      return {
        submission_id: submission.id,
        problem_id: submission.entity_id,
        score: submission.score,
        feedback: submission.feedback,
      };
    }) || [];
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table isHeaderSticky isStriped aria-label="Submissions table">
      <TableHeader columns={tableColumn}>
        {(column) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody
        items={modifiedSubmissionList}
        emptyContent="No Submissions found"
      >
        {(item: any) => {
          return (
            <TableRow key={item.problem_id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey, type)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default SubmissionList;
