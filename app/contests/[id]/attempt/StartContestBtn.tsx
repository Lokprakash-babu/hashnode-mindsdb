"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

const StartContestBtn = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathName = usePathname();
  const requestFullscreenAccess = (e) => {
    e.stopPropagation;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      router.replace(`${pathName}/attempt`);
    } else if (document.exitFullscreen) {
      console.log("exiting full screen");
      document.exitFullscreen();
    }
  };
  return (
    <>
      <Button onPress={onOpen}>Start Contest</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Fullscreen mode
              </ModalHeader>
              <ModalBody>
                <p>Please enable fullscreen to attend the contest</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Deny
                </Button>
                <Button color="primary" onPress={requestFullscreenAccess}>
                  Enable
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default StartContestBtn;
