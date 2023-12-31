export const JsonExtractor = (sentence) => {
  return `SELECT json
FROM mindsdb.nlp_model
WHERE sentence = '${sentence}';`;
};
