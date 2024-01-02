import ChaptersContent from "./ChaptersContent";
import ActionsContainer from "./ActionsContainer";

export interface IChapters {
  title: string;
  id: string;
  about: string;
  chapter_content: string;
}

const LessonDetails = ({ chapters }: { chapters: IChapters }) => {
  return (
    <section className="flex justify-between">
      {/* <ChaptersContainer chapters={chapters} /> */}
      <ChaptersContent
        content={chapters.chapter_content}
        // maxChapter={chapters.length}
      />
      <ActionsContainer
        content={chapters.chapter_content}
        chapterId={chapters.id}
      />
    </section>
  );
};

export default LessonDetails;
