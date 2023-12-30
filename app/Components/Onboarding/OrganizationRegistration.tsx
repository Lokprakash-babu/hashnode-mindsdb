import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Toast from "../Toasts/Toast";
import BackArrow from "../Icons/BackArrow";
import AccountRegistrationForm from "../Forms/AccountRegistrationForm";
import { requestWrapper } from "@/lib/requestWrapper";
import { useEffect, useState } from "react";
import SingleSelect from "../Forms/Fields/SingleSelect";
import Business from "../Icons/Business";
import InputField from "../Forms/Fields/InputField";

const ChooseOrganization = ({ selectCurrentOrg }) => {
  const [orgs, setOrgs] = useState([]);
  const [addOrg, setAddOrg] = useState(false);
  let newOrg;
  useEffect(() => {
    requestWrapper("/organisation", {
      cache: "no-store",
    }).then((orgList) => {
      const list = orgList.map((org) => {
        return { key: org.id, label: org.name, value: org.id };
      });
      setOrgs(list);
    });
  }, [addOrg]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleOnChange = (e) => {
    newOrg = e.target.value;
  };

  const saveOrg = () => {
    requestWrapper("organisation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: `org-${Date.now()}`, name: newOrg }),
    }).then(() => {
      setAddOrg((prev) => !prev);
    });
  };
  return (
    <div className="org-wrapper flex flex-col gap-y-2">
      <SingleSelect
        onChange={(data) => selectCurrentOrg(data.target.value)}
        label="Organisation"
        className="flex-1 min-w-[150px]"
        isRequired={true}
        placeholder="Select your Org"
        data={orgs}
      />
      <div className="org-action-wrapper flex gap-x-2 items-center justify-end">
        <p className="text-[#8692A6] line-clamp-2">Not in list?</p>
        <Button variant="light" radius="sm" onPress={onOpen}>
          Create Org
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Create Org
              </ModalHeader>
              <ModalBody>
                <InputField
                  onChange={handleOnChange}
                  className="text-black"
                  autoFocus
                  startContent={<Business />}
                  label="Organisation"
                  placeholder="Enter your org name"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={saveOrg}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
const OrganizationRegistration = ({ setPathComponent, accountId }) => {
  const [currentOrg, selectCurrentOrg] = useState(null);
  return (
    <div className="p-10 flex flex-col gap-y-10">
      <div className="header-wrapper">
        <Button
          variant="light"
          radius="sm"
          onClick={() => setPathComponent("path")}
        >
          <BackArrow /> Back
        </Button>
      </div>
      <div className="form-wrapper m-auto flex flex-col gap-y-6">
        <div className="wrapper flex flex-col gap-y-2">
          <h1 className="header-1-400">Register as Hiring Manager!</h1>
          <p className="text-[#8692A6] line-clamp-2">
            For the purpose of industry regulation, your details are required.
          </p>
        </div>
        {}
        <ChooseOrganization selectCurrentOrg={selectCurrentOrg} />
        <AccountRegistrationForm
          accountId={accountId}
          type="hiring_manager"
          currentOrg={currentOrg}
        />
      </div>
      <Toast />
    </div>
  );
};

export default OrganizationRegistration;
