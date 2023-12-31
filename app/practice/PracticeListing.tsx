"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";

import { Companies, practiceData } from "../constants/practice";
import clsx from "clsx";
import CategoryChip from "../Components/CategoryChip";
import DifficultyChip from "../Components/DifficultyChip";

const tableColumn = [
  {
    key: "title",
    uid: "title",
    label: "Title",
  },
  {
    key: "type",
    uid: "type",
    label: "Type",
  },
  {
    key: "difficulty",
    uid: "difficulty",
    label: "Category",
  },
  {
    key: "companies",
    uid: "companies",
    label: "Companies",
  },
];

const renderCell = (
  item: {
    id: string;
    category: string;
    chapters: string;
    title: string;
  },
  columnKey: string
) => {
  switch (columnKey) {
    case "title":
      return (
        <Link href={`/practice/${item.id}`} className="text-blue underline">
          {item[columnKey]}
        </Link>
      );
    case "type":
      return <CategoryChip category={item[columnKey]} />;
    case "companies":
      return (
        <div className="flex gap-1">
          {Companies.map(({ name, type }) => {
            return (
              //@ts-ignore
              <Chip key={name} color={type} variant={"dot"}>
                <p className={clsx("text-md-500")}>{name}</p>
              </Chip>
            );
          })}
        </div>
      );
    case "difficulty":
      return <DifficultyChip difficulty={item[columnKey]} />;
    default:
      //@ts-ignore
      return <p>{item[columnKey]}</p>;
  }
};

const PracticeListing = () => {
  return (
    <Table
      isStriped
      isHeaderSticky
      aria-label="Practice problems table"
      className={clsx("mt-8")}
    >
      <TableHeader columns={tableColumn}>
        {(column) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody items={practiceData} emptyContent="No Practice problems found">
        {(item: any) => {
          return (
            <TableRow key={item.id}>
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

export default PracticeListing;
