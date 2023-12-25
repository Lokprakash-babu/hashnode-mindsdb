"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import ChaptersContainer from "./ChaptersContainer";
import ChaptersContent from "./ChaptersContent";
import ActionsContainer from "./ActionsContainer";

export interface IChapters {
  title: string;
  id: string;
  about: string;
  chapter_content: string;
}

const chapterValidator = (chapters, currentChapter) => {
  if (chapters.length > currentChapter && currentChapter >= 0) {
    return true;
  }
  return false;
};
const LessonDetails = ({ chapters }: { chapters: IChapters[] }) => {
  const searchParams = useSearchParams();
  const chapterNumber = Number(searchParams.get("chapter")) || 0;
  const router = useRouter();
  const pathName = usePathname();
  const isValidChapter = useMemo(
    () => chapterValidator(chapters, chapterNumber),
    [chapterNumber]
  );
  useEffect(() => {
    if (!isValidChapter) {
      router.replace(`${pathName}?chapter=0`);
    }
  }, [router, isValidChapter]);
  if (!isValidChapter) {
    return null;
  }
  return (
    <section className="flex justify-between">
      <ChaptersContainer chapters={chapters} />
      <ChaptersContent
        content={chapters[chapterNumber].chapter_content}
        maxChapter={chapters.length}
      />
      <ActionsContainer
        content={chapters[chapterNumber].chapter_content}
        chapterId={chapters[chapterNumber].id}
      />
    </section>
  );
};

export default LessonDetails;
