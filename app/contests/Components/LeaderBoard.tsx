import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";
import { STATUS_COLOR_MAPPING, TABLE_HEADERS } from "../[id]/constants";
import { useCallback } from "react";

export const LeaderBoard = ({ candidates, setCurrentCandidate }) => {
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: user.avatar_url }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return <div className="flex flex-col"></div>;
      case "contest_status":
        return (
          <Chip
            className="capitalize"
            color={STATUS_COLOR_MAPPING[cellValue].type}
            size="md"
            variant="flat"
          >
            {STATUS_COLOR_MAPPING[cellValue].label}
          </Chip>
        );
      case "actions":
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table
      selectionMode="multiple"
      selectionBehavior="replace"
      aria-label="Leader Board"
      onRowAction={(key) => {
        setCurrentCandidate(
          candidates.find((candidate) => candidate.id === key)
        );
      }}
    >
      <TableHeader columns={TABLE_HEADERS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={candidates}>
        {(item: any) => (
          <TableRow className="cursor-pointer" key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
