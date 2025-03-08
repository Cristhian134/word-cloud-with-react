import { Word } from "d3-cloud";
import { WordInfo } from "../../../types";

export function D3CloudAdapter(texts: WordInfo): Word[] {
  const words = [];
  for (const text in texts) {
    const size = texts[text];
    if (size > 5) {
      const word = { text: text, size: size };
      words.push(word);
    }
  }
  return words;
}
