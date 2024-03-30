export const convertHtmlToString = (html) => {
  const stripHtml = html.replace(/<[^>]*>/g, "");
  return `${stripHtml.slice(0, 55)}...`;
};
