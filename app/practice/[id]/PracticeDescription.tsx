import CategoryChip, { Category } from "@/app/Components/CategoryChip";
import DifficultyChip, { Difficulty } from "@/app/Components/DifficultyChip";
import clsx from "clsx";
export interface IProblemSection {
  description: string;
  expectations: string[];
  type: string;
  difficulty: string;
  companiesAskedIn: string[];
}

const PracticeDescription = (props: IProblemSection) => {
  const { type, difficulty } = props;
  console.log("type", type);
  return (
    <>
      <div className={clsx("flex items-center gap-2 mb-5")}>
        <CategoryChip category={type as Category} />
        <DifficultyChip difficulty={difficulty as Difficulty} />
      </div>
      <div className={clsx("mb-6 text-md")}>
        <h2 className={clsx("header-2-600 mb-2")}>Description</h2>
        {props.description}
      </div>
      <div className="text-md">
        <h2 className={clsx("header-2-600 mb-2")}>Expectations</h2>
        <ul className={clsx("list-disc list-inside	")}>
          {props.expectations.map((expectation, index) => (
            <li key={index} className={clsx("mb-2 text-md")}>
              {expectation}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default PracticeDescription;
