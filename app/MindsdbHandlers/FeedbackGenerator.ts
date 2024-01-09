export const generateFeedback = (answers, model) => {
  const answerString = Array.isArray(answers)
    ? answers
        .filter((answer) => {
          return answer.type === "user";
        })
        .map((filterAnswer) => {
          return `User: ${filterAnswer.message}`;
        })
        .join(",")
    : answers;
  console.log("answer string", answerString);
  return `
    SELECT response FROM ${model}
    WHERE answer="${answerString}"
    `;
};
