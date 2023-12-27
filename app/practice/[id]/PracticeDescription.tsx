import { Chip } from "@nextui-org/react";
export interface IProblemSection {
  description: string;
  expectations: string[];
  type: string;
  difficulty: string;
  companiesAskedIn: string[];
}

const PracticeDescription = (props: IProblemSection) => {
  const { type, difficulty } = props;
  return (
    <>
      <div>
        <Chip>{type}</Chip>
        <Chip>{difficulty}</Chip>
      </div>
      <div>
        <h4>Description</h4>
        {props.description}
      </div>
      <div>
        <h3>Expectations</h3>
        <ul>
          {props.expectations.map((expectation, index) => (
            <li key={index}>{expectation}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default PracticeDescription;
