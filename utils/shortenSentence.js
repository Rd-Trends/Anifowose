export const shortenSentence = (sentence, maxLength, seperator = " ") => {
  if (sentence.lenght <= maxLength) return sentence;
  return sentence.substr(0, sentence.lastIndexOf(seperator, maxLength));
};
