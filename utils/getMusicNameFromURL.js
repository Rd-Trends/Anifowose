export const getMusicNameFromURL = (url) => {
  return url.split("/").filter((items) => items.includes("mp3"))[0];
};
