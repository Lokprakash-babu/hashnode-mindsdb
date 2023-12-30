"use client";
import Link from "next/link";
import { IChapters } from "./LessonDetails";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

const ChaptersContainer = ({ chapters }: { chapters: IChapters[] }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentChapter = Number(searchParams.get("chapter")) || 0;
  return (
    <div className={clsx("chapter-container min-w-[300px] mb-5")}>
      <div className="sticky left-0 top-5 border rounded-md pl-4 pr-2 py-5 ">
        {chapters.map(({ id, title }, idx) => {
          const isActiveChapter = idx === currentChapter;
          return (
            <div key={id} className={clsx("mb-5 text-md last:mb-0")}>
              <Link
                href={`${pathName}?chapter=${idx}`}
                className={clsx(isActiveChapter && "text-blue underline")}
              >
                <p>{title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChaptersContainer;
