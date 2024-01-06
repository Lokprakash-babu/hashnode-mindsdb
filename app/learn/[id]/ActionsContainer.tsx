"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import AskAI from "./AskAI";
import Button from "@/app/Components/Buttons";
import { AiTwotoneEdit } from "react-icons/ai";

const Summarize = ({ content }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [httpRequest, setHttpRequest] = useState({
    data: "",
    loading: true,
    error: "",
  });
  useEffect(() => {
    if (isOpen) {
      setHttpRequest({
        data: "",
        loading: true,
        error: "",
      });
      requestWrapper("/summary", {
        method: "POST",
        body: JSON.stringify({
          content,
        }),
      })
        .then((response) => {
          setHttpRequest({
            data: response.message,
            loading: false,
            error: "",
          });
        })
        .catch((err) => {
          setHttpRequest({
            data: "",
            loading: false,
            error: err,
          });
        });
    }
  }, [isOpen]);

  return (
    <>
      <Tooltip content="Summarize" placement="left">
        <button
          onClick={onOpen}
          className="border border-gray rounded-full flex items-center gap-1 group text-black p-5"
        >
          <AiTwotoneEdit />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Summary
                </ModalHeader>
                <ModalBody>
                  {httpRequest.loading && <Spinner />}
                  {httpRequest.loading === false && !!httpRequest.data && (
                    <p>{httpRequest.data + "..."}</p>
                  )}
                  {httpRequest.loading === false && !!httpRequest.error && (
                    <p>
                      Something went wrong! Please close and reopen the dialog
                    </p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

const ActionsContainer = ({ content, lessonId }) => {
  return (
    <div>
      <div className="sticky right-0 top-5 flex flex-col gap-2">
        <Summarize content={content} />
        <AskAI lessonId={lessonId} />
      </div>
    </div>
  );
};

export default ActionsContainer;
