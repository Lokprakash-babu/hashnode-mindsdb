"use client";
import clsx from "clsx";
import Markdown from "react-markdown";

const ChaptersContent = ({ content }: { content: string }) => {
  return (
    <div className={clsx("px-5 mb-10")}>
      <Markdown className={"markdown"}>{content}</Markdown>
    </div>
  );
};

export default ChaptersContent;
