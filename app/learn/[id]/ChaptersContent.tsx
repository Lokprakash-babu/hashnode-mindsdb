"use client";
import Button from "@/app/Components/Buttons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Markdown from "react-markdown";

const ChaptersContent = ({
  content,
  maxChapter,
}: {
  content: string;
  maxChapter: number;
}) => {
  const searchParams = useSearchParams();
  const currentChapter = Number(searchParams.get("chapter")) || 0;
  const pathName = usePathname();
  return (
    <div className={clsx("px-5 mb-10")}>
      <Markdown className={"markdown"}>{content}</Markdown>
      <div className="flex justify-between">
        <Link href={`${pathName}?chapter=${currentChapter - 1}`}>
          <Button
            color="secondary"
            className={clsx(
              currentChapter !== 0 ? "visible" : "invisible",
              "font-semibold"
            )}
          >
            Previous Chapter
          </Button>
        </Link>
        <Link href={`${pathName}?chapter=${currentChapter + 1}`}>
          <Button
            color="primary"
            className={clsx(
              currentChapter + 1 !== maxChapter ? "visible" : "invisible",
              "font-semibold"
            )}
          >
            Next Chapter
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChaptersContent;
