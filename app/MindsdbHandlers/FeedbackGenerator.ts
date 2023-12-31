export const generateFeedback = (answers) => {
  console.log("answers in generateFeedback", answers);
  const answerString =
    answers instanceof Array
      ? answers
          .filter((answer) => {
            return answer.type === "user";
          })
          .map((filterAnswer) => {
            return `User: ${filterAnswer.message}`;
          })
          .join(",")
      : answers;
  return `
    SELECT response FROM evaluator_model
    WHERE answer="${answerString}"
    `;
};
