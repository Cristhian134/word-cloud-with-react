import { useContext } from "react";
import { WordCloudContext } from "../contexts/wordcloud.context";

export function useWordCloud() {
  const wordCloudContext = useContext(WordCloudContext);

  if (wordCloudContext === undefined) {
    throw new Error(
      "useWordCloud must be used within a WordCloudContextProvider"
    );
  }

  return wordCloudContext;
}
