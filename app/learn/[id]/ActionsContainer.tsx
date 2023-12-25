import Toast from "@/app/Components/Toasts/Toast";
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
import { toast } from "react-toastify";

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

const Quiz = ({ content }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  return (
    <>
      <Button onClick={onOpen}>Quiz</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Summary</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
const ActionsContainer = ({ content }) => {
  return (
    <div>
      <div className="sticky right-0 top-0">
        <Summarize content={content} />
        <Quiz content={content} />
      </div>
    </div>
  );
};

export default ActionsContainer;
