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
  AVAILABLE_CATEGORIES,
  categoriesLabelMap,
} from "../constants/categories";
import { practiceData } from "../constants/practice";

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

const getChipType = (category: string) => {
  if (category === AVAILABLE_CATEGORIES.CUSTOMER_SUPPORT) {
    return "success";
  }
  return "warning";
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
      return <Link href={`/learn/${item.id}`}>{item[columnKey]}</Link>;
    case "category":
      const chipType = getChipType(item[columnKey]);
      return (
        <Chip variant="bordered" color={chipType}>
          {categoriesLabelMap[item[columnKey]]}
        </Chip>
      );
    default:
      //@ts-ignore
      return <p>{item[columnKey]}</p>;
  }
};

const PracticeListing = () => {
  return (
    <Table removeWrapper aria-label="Practice problems table">
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
