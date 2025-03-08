import { Word } from "d3-cloud";
import { Settings, WordInfo } from "../../../types";

export function D3CloudAdapter(texts: WordInfo, settings: Settings): Word[] {
  const words = [];
  for (const text in texts) {
    const size = texts[text];
    if (size > settings.minFrequency) {
      const word = { text: text, size: size };
      words.push(word);
    }
  }

  words.sort((a, b) => b.size - a.size);

  return words.slice(0, Number(settings.maxWords));
}
