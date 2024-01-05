"use client";
import Button from "@/app/Components/Buttons";
import ChatMessenger, { IChatMessenger } from "@/app/Components/ChatMessenger";
import EmailEditor, { IEmailEditor } from "@/app/Components/EmailEditor";
import { PracticeCategory } from "@/app/constants/practice";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import { requestWrapper } from "@/lib/requestWrapper";
import Link from "next/link";
import { useState } from "react";

type MetaProps = {
  practiceId: string;
  isReadOnly?: boolean;
};
type chatMessengerType = {
  type: PracticeCategory.CHAT;
} & Omit<IChatMessenger, "isReadOnly"> &
  MetaProps;

type emailMessengerType = {
  type: PracticeCategory.EMAIL;
} & Omit<IEmailEditor, "isReadOnly"> &
  MetaProps;

type PracticeSolutionProps = emailMessengerType | chatMessengerType;
const PracticeSolution = (props: PracticeSolutionProps) => {
  const solutionType = props.type;
  const isReadOnly = props.isReadOnly || false;
  const [submissionId, setSubmissionId] = useState("");

  const createSubmission = (requestBody) => {
    requestWrapper("/practice_submission", {
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        const submissionId = response.message.submissionId;
        setSubmissionId(submissionId);
      })
      .catch((err) => {
        console.log("error in practice solution", err);
      });
  };
  const submitForFeedbackChat = (chatMessages) => {
    const requestBody = {
      practiceId: props.practiceId,
      answer: chatMessages,
      feedbackAnswer: chatMessages,
    };
    createSubmission(requestBody);
  };
  const submitForFeedbackEmail = (emailText) => {
    console.log("email", emailText);
    const requestBody = {
      practiceId: props.practiceId,
      answer: emailText,
      feedbackAnswer: removeHtmlTags(emailText.unFormattedContent),
    };
    createSubmission(requestBody);
  };

  if (submissionId) {
    return (
      <Link href={`/submissions/${submissionId}`}>
        <Button>View your feedback</Button>
      </Link>
    );
  }
  switch (solutionType) {
    case PracticeCategory.CHAT:
      return (
        <ChatMessenger
          {...props}
          key={"chat"}
          onEndChat={submitForFeedbackChat}
          isReadOnly={isReadOnly}
        />
      );
    case PracticeCategory.EMAIL:
      return (
        <EmailEditor
          {...props}
          key={"email"}
          onSubmit={submitForFeedbackEmail}
          isReadOnly={isReadOnly}
        />
      );
    default:
      return null;
  }
};

export default PracticeSolution;
