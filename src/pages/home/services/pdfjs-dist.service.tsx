import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { TextContent } from "pdfjs-dist/types/src/display/api";
import { WordInfo } from "../../../types";
import { removeStopwords } from "stopword";
import nlp from "compromise";

function cleanText(text: string): string {
  const removed = nlp(text).nouns().out("array").join(" ");
  const newText = removeStopwords(removed.split(" "))
    .join(" ")
    .replace(/[^\p{L}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  return newText;
}

export async function processPdf(pdfFile: File) {
  const url = URL.createObjectURL(pdfFile);
  const texts: WordInfo = {};

  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  const pdfPromise = pdfjsLib.getDocument(url);

  const pdf = await pdfPromise.promise;
  const pages = pdf._pdfInfo.numPages;

  for (let i = 1; i <= pages; i++) {
    const page = await pdf.getPage(i);
    const content: TextContent = await page.getTextContent();
    content.items.forEach((item) => {
      if ("str" in item) {
        const sentence = cleanText(item.str);
        if (sentence) {
          sentence.split(" ").forEach((word) => {
            if (word in texts && word.length > 1) {
              texts[word]++;
            } else {
              texts[word] = 0;
            }
          });
        }
      }
    });
  }

  return texts;
}
