"use client";

import ChatMessenger from "@/app/Components/ChatMessenger";
import EmailEditor from "@/app/Components/EmailEditor";

const ResponsePreview = ({ value }) => {
  const isEmailType = typeof value === "string";
  return (
    <>
      {!isEmailType && (
        <ChatMessenger chatHistory={value.toBeRenderedMessages} isReadOnly />
      )}
      {isEmailType && (
        <EmailEditor
          initialValue={{
            unFormattedContent: value,
            formattedContent: "",
          }}
          isReadOnly
        />
      )}
    </>
  );
};

export default ResponsePreview;
