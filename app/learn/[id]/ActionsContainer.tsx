import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import AskAI from "./AskAI";

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
      <Button onClick={onOpen}>Summarize</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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

const ActionsContainer = ({ content, chapterId }) => {
  return (
    <div>
      <div className="sticky right-0 top-0">
        <Summarize content={content} />
        <AskAI chapterId={chapterId} />
      </div>
    </div>
  );
};

export default ActionsContainer;
