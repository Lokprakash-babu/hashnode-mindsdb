import { Chip } from "@nextui-org/react";

export type Difficulty = "Easy" | "Medium" | "Hard";
const DifficultyChip = ({ difficulty }: { difficulty: Difficulty }) => {
  switch (difficulty) {
    case "Easy":
      return (
        <Chip color="success" variant="dot">
          <p className="text-md-500">Easy</p>
        </Chip>
      );
    case "Medium":
      return (
        <Chip color="warning" variant="dot">
          <p className="text-md-500">Medium</p>
        </Chip>
      );
    default:
      return (
        <Chip color="danger" variant="dot">
          <p className="text-md-500">Hard</p>
        </Chip>
      );
  }
};

export default DifficultyChip;
