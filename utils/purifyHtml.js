import DOMPurify from "isomorphic-dompurify";

export const purifyHTML = (htmlString) => {
  const cleanHtmlString = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
  });
  return cleanHtmlString;
};
