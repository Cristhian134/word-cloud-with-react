import { Settings, Word, WordInfo } from "../../../types";

// wordcloud2.js
export function Wordcloud2JsAdapter(
  texts: WordInfo,
  settings: Settings
): Word[] {
  const words: [string, number][] = [];

  for (const text in texts) {
    const size = texts[text];
    if (size > settings.minFrequency && !settings.exclude.includes(text)) {
      words.push([text, size]);
    }
  }

  words.sort((a, b) => b[1] - a[1]);

  return words.slice(0, Number(settings.maxWords));
}
