export const removeHtmlTags = (content) => {
  return content?.replace(/<[^>]*>/g, ""); // This regex will remove HTML tags
};
