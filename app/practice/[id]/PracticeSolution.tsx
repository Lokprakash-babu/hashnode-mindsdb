"use client";
import ChatMessenger, { IChatMessenger } from "@/app/Components/ChatMessenger";
import EmailEditor, { IEmailEditor } from "@/app/Components/EmailEditor";
import { PracticeCategory } from "@/app/constants/practice";
import { requestWrapper } from "@/lib/requestWrapper";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

type MetaProps = {
  practiceId: string;
};
type chatMessengerType = {
  type: PracticeCategory.CHAT;
} & IChatMessenger &
  MetaProps;

type emailMessengerType = {
  type: PracticeCategory.EMAIL;
} & IEmailEditor &
  MetaProps;

type PracticeSolutionProps = emailMessengerType | chatMessengerType;
const PracticeSolution = (props: PracticeSolutionProps) => {
  const solutionType = props.type;
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
      userId: "test_user_123",
      practiceId: props.practiceId,
      answer: chatMessages,
    };
    createSubmission(requestBody);
  };
  const submitForFeedbackEmail = (emailText) => {
    console.log("email", emailText);
    // const requestBody = {
    //   userId: "test_user_123",
    //   practiceId: props.practiceId,
    //   answer: [
    //     {
    //       type: "user",
    //       message: emailText,
    //     },
    //   ],
    // };
    // createSubmission(emailText);
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
        />
      );
    case PracticeCategory.EMAIL:
      return (
        <EmailEditor
          {...props}
          key={"email"}
          onSubmit={submitForFeedbackEmail}
        />
      );
    default:
      return null;
  }
};

export default PracticeSolution;
