import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Mic from "../Icons/Mic";

import { TONE_TYPES } from "./constants";
import Button from "../Buttons";
export const ToneDropdown = ({
  selectedValue,
  selectedKeys,
  setSelectedKeys,
}) => {
  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <Button
          radius="sm"
          variant="bordered"
          className="capitalize flex gap-x-1"
        >
          <Mic />
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="text-black"
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        // @ts-ignore
        onSelectionChange={setSelectedKeys}
      >
        {TONE_TYPES.map((tone) => (
          <DropdownItem key={tone.key}>{tone.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
