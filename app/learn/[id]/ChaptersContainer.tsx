"use client";
import Link from "next/link";
import { IChapters } from "./LessonDetails";
import { usePathname } from "next/navigation";

const ChaptersContainer = ({ chapters }: { chapters: IChapters[] }) => {
  const pathName = usePathname();
  return (
    <div>
      <div className="sticky left-0 top-0">
        {chapters.map(({ id, title, about }, idx) => {
          return (
            <Link href={`${pathName}?chapter=${idx}`} key={id}>
              <div>
                <h3>{title}</h3>
                <hr />
                <p>{about}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChaptersContainer;
