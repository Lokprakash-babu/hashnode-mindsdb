"use client";
import { notFound } from "next/navigation";
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
import clsx from "clsx";

const tableColumn = [
  {
    key: "title",
    uid: "title",
    label: "Title",
  },
  {
    key: "chapters",
    uid: "chapters",
    label: "Chapters",
  },
  {
    key: "category",
    uid: "category",
    label: "Category",
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
      return (
        <Link href={`/learn/${item.id}`} className="text-blue underline">
          {item[columnKey]}
        </Link>
      );
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

const LessonsListing = ({ lessons }) => {
  const rows = lessons.reduce(
    (
      prev: any,
      curr: { id: any; title: any; chapter_count: any; category: any }
    ) => {
      return [
        ...prev,
        {
          id: curr.id,
          title: curr.title,
          chapters: curr.chapter_count,
          category: curr.category,
        },
      ];
    },
    []
  );
  return (
    <Table
      isStriped
      isHeaderSticky
      aria-label="Learning module table"
      className={clsx("mt-8")}
    >
      <TableHeader columns={tableColumn}>
        {(column) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody items={rows} emptyContent="No Lessons found">
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

export default LessonsListing;
