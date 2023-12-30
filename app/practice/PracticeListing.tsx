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

import {
  Companies,
  PracticeCategory,
  practiceCategoryToLabel,
  practiceData,
} from "../constants/practice";
import clsx from "clsx";

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

const getChipType = (category: PracticeCategory) => {
  switch (category) {
    case PracticeCategory.CHAT:
      return "success";
    case PracticeCategory.EMAIL:
      return "warning";
    default:
      return "danger";
  }
};

const renderCell = (
  item: {
    id: string;
    category: string;
    chapters: string;
    title: string;
  },
  columnKey: string
) => {
  console.log("item", { item, columnKey });
  switch (columnKey) {
    case "title":
      return (
        <Link href={`/practice/${item.id}`} className="text-blue underline">
          {item[columnKey]}
        </Link>
      );
    case "type":
      const chipType = getChipType(item[columnKey]);
      return (
        <Chip variant="bordered" color={chipType}>
          {practiceCategoryToLabel[item[columnKey]]}
        </Chip>
      );
    case "companies":
      return (
        <div className="flex gap-1">
          {Companies.map(({ name, type }) => {
            return (
              //@ts-ignore
              <Chip key={name} color={type}>
                {name}
              </Chip>
            );
          })}
        </div>
      );
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
