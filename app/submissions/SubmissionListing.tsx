"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";

const tableColumn = [
  {
    key: "submission_id",
    uid: "submission_id",
    label: "Submission",
  },
  {
    key: "problem_id",
    uid: "problem_id",
    label: "Practice Problem",
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

const renderCell = (item, columnKey: string) => {
  switch (columnKey) {
    case "feedback":
      const parsedFeedback = JSON.parse(item[columnKey]);
      //TODO: Add truncated feedback
      // const feedbackLength = item[columnKey].length;
      return <p>{parsedFeedback?.overall_feedback || ""}</p>;
    case "score":
      return <p>{item[columnKey]}</p>;
    case "submission_id":
    case "problem_id":
      const link =
        columnKey === "submission_id"
          ? { text: "View Submission", href: `/submissions/${item[columnKey]}` }
          : { text: "View Problem", href: `/practice/${item[columnKey]}` };
      return <Link href={link.href}>{link.text}</Link>;
  }
};

const SubmissionList = ({ submissions }) => {
  return (
    <Table removeWrapper aria-label="Practice problems table">
      <TableHeader columns={tableColumn}>
        {(column) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody items={submissions} emptyContent="No Practice problems found">
        {(item: any) => {
          return (
            <TableRow key={item.problem_id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default SubmissionList;
