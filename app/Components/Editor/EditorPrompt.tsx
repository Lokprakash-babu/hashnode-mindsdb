import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import Magic from "../Icons/Magic";
import { ToneDropdown } from "./ToneDropdown";
import Regenerate from "../Icons/Regenerate";
import TickMark from "../Icons/TickMark";

export default function EditorPrompt({ showPrompt, setShowPrompt }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["academic"]));
  const [prompText, setPromptText] = useState("");
  const [generateClick, setGenerateClick] = useState(false);
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const BeforePromptFooter = () => {
    return (
      <div className="flex justify-between w-full">
        <ToneDropdown
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          selectedValue={selectedValue}
        ></ToneDropdown>
        <Button
          disableRipple
          radius="sm"
          className="flex gap-x-1"
          color="primary"
          onClick={() => setGenerateClick(true)}
        >
          <Magic></Magic>
          Generate Text
        </Button>
      </div>
    );
  };
  const AfterPromptFooter = () => {
    return (
      <div className="flex justify-between w-full">
        <ToneDropdown
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          selectedValue={selectedValue}
        ></ToneDropdown>
        <div className="action-wrapper flex gap-x-1.5">
          <Button color="primary" className="flex gap-x-1 items-center" disableRipple radius="sm" variant="bordered">
            <TickMark /> <div>Insert</div>
          </Button>
          <Button
            disableRipple
            radius="sm"
            className="flex gap-x-1 items-center"
            color="primary"
            onClick={() => setGenerateClick(true)}
          >
            <Regenerate />
            <div>Regenerate</div>
          </Button>
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={showPrompt}
        onOpenChange={() => setShowPrompt(false)}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-md">
                Prompt
              </ModalHeader>
              <ModalBody>
                <Textarea
                  variant="bordered"
                  value={prompText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Tell me what you want me to write about"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[80px] text-black",
                  }}
                />
              </ModalBody>
              <ModalFooter>
                {generateClick ? <AfterPromptFooter /> : <BeforePromptFooter />}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
