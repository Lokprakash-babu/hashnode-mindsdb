import ChaptersContent from "./ChaptersContent";
import ActionsContainer from "./ActionsContainer";

export interface IChapters {
  title: string;
  id: string;
  about: string;
  content: string;
}

const LessonDetails = ({
  chapters,
  lessonId,
}: {
  chapters: IChapters;
  lessonId: string;
}) => {
  return (
    <section className="flex justify-between">
      {/* <ChaptersContainer chapters={chapters} /> */}
      <ChaptersContent
        content={chapters.content}
        // maxChapter={chapters.length}
      />
      <ActionsContainer content={chapters.content} lessonId={lessonId} />
    </section>
  );
};

export default LessonDetails;
