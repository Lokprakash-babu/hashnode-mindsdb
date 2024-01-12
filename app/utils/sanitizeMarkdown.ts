export const removeHtmlTags = (content) => {
  return content?.replace(/<[^>]*>/g, "").toString(); // This regex will remove HTML tags
};
