"use client";
import Button from "@/app/Components/Buttons";
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
    <div>
      <Markdown>{content}</Markdown>
      <div className="flex justify-between">
        {currentChapter !== 0 && (
          <Link href={`${pathName}?chapter=${currentChapter - 1}`}>
            <Button color="primary" variant="ghost">
              Previous Chapter
            </Button>
          </Link>
        )}
        {currentChapter + 1 !== maxChapter && (
          <Link href={`${pathName}?chapter=${currentChapter + 1}`}>
            <Button color="primary">Next Chapter</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChaptersContent;
