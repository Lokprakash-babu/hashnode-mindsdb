import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import Magic from "../Icons/Magic";
import { ToneDropdown } from "./ToneDropdown";
import Regenerate from "../Icons/Regenerate";
import TickMark from "../Icons/TickMark";
import { requestWrapper } from "@/lib/requestWrapper";
import Markdown from "react-markdown";

const generatePrompt = async ({
  promptText,
  conversationTone,
  setPromptResponse,
  aiUrl,
}) => {
  const promptResponse = await requestWrapper(aiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: promptText,
      conversation_tone: conversationTone,
      type: "bot_conversation",
      context: "Customer Support Contest Question",
    }),
  });
  setPromptResponse(promptResponse.rows[0]);
};

export default function EditorPrompt({
  showPrompt,
  setShowPrompt,
  setModel,
  aiUrl = "gpt/generate",
}) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["academic"]));
  const [promptText, setPromptText] = useState("");
  const [generateClick, setGenerateClick] = useState(false);
  const [promptResponse, setPromptResponse] = useState<any>(null);
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
          onClick={() => {
            setGenerateClick(true);
            generatePrompt({
              promptText,
              conversationTone: selectedValue,
              setPromptResponse,
              aiUrl,
            });
          }}
        >
          <Magic></Magic>
          Generate Text
        </Button>
      </div>
    );
  };
  const AfterPromptFooter = ({ onClose }) => {
    return (
      <div className="flex justify-between w-full">
        <ToneDropdown
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          selectedValue={selectedValue}
        ></ToneDropdown>
        <div className="action-wrapper flex gap-x-1.5">
          <Button
            color="primary"
            className="flex gap-x-1 items-center"
            disableRipple
            radius="sm"
            onPress={onClose}
            onClick={() => {
              setModel(promptResponse?.answer);
            }}
            variant="bordered"
          >
            <TickMark /> <div>Insert</div>
          </Button>
          <Button
            disableRipple
            radius="sm"
            className="flex gap-x-1 items-center"
            color="primary"
            onClick={() =>
              generatePrompt({
                promptText,
                conversationTone: selectedValue,
                setPromptResponse,
                aiUrl,
              })
            }
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
        onOpenChange={() => {
          setShowPrompt(false);
          setPromptResponse(null);
          setGenerateClick(false);
          setPromptText("");
        }}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="preview-prompt-wrapper flex flex-col gap-y-2">
                  {promptResponse && (
                    <div className="preview-section gap-y-2">
                      <h1 className="text-black text-md text-medium mb-2">
                        Preview
                      </h1>

                      <Markdown className="text-black max-h-[180px] overflow-y-auto border-l-4 border-neutral-100 px-8 py-2">
                        {promptResponse?.answer}
                      </Markdown>
                    </div>
                  )}
                  <div className="prompt-section flex flex-col gap-y-1">
                    <h1 className="text-black text-md">Prompt</h1>
                    <Textarea
                      variant="bordered"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      placeholder="Tell me what you want me to write about"
                      disableAnimation
                      disableAutosize
                      classNames={{
                        base: "w-full",
                        input: "resize-y min-h-[80px] text-black",
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {generateClick ? (
                  <AfterPromptFooter onClose={onClose} />
                ) : (
                  <BeforePromptFooter />
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
