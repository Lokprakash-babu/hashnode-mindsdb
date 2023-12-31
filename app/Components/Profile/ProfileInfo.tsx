import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import PrimaryButton from "@/app/Components/Buttons";
import Link from "next/link";
import FileUpload from "../FileUpload/FileUpload";
import EditIcon from "../Icons/EditIcon";
import { requestWrapper } from "@/lib/requestWrapper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Toast from "../Toasts/Toast";

export default function ProfileInfo({ user }) {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(user?.document_url || "");
  const [editResume, setEditResume] = useState(false);

  const updateResume = () => {
    const updateData = {
      document_url: fileUrl,
    };
    requestWrapper(`account/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }).then(
      () => {
        router.refresh();
        setEditResume(false);
        toast.success("Information updated successfuly");
      },
      () => {
        toast.error("Unable to update the information");
      }
    );
  };

  return (
    <Tabs variant="underlined" aria-label="Options" className="px-4">
      <Tab key="resume" title="Resume" className="max-w-[400px]">
        <div className="tab-wrapper px-8 flex flex-col gap-y-8 relative">
          {!editResume && (
            <Button
              onClick={() => setEditResume(true)}
              className="action-wrapper flex gap-x-2 items-center bg-transparent absolute z-10 right-14 top-4"
            >
              <EditIcon />
              <span className="text-[#2C5CC5]">Update Resume</span>
            </Button>
          )}
          {!editResume && (
            <Link
              target="_blank"
              href={user.document_url}
              className="text-[#2C5CC5]"
            >
              <FileUpload
                disabled
                setFileUrl={setFileUrl}
                showLabel={false}
                initialFile={[fileUrl]}
              />
            </Link>
          )}
          {editResume && (
            <div className="edit-resume-wrapper flex flex-col gap-y-4 flex-end">
              <FileUpload
                setFileUrl={setFileUrl}
                showLabel={false}
                initialFile={[]}
              />
              <PrimaryButton
                onClick={updateResume}
                className="max-w-[45px] flex flex-end self-end"
                variant="primary"
              >
                Save
              </PrimaryButton>
            </div>
          )}
          <Toast />
        </div>
      </Tab>
    </Tabs>
  );
}
