import { createContext, useState } from "react";
import { PdfBase, WordCloudContextType, WordInfo } from "../types";

export const WordCloudContext = createContext<WordCloudContextType | undefined>(
  undefined
);

export function WordCloudProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<WordInfo>({});
  const [pdfs, setPdfs] = useState<PdfBase[]>([]);
  const [total, setTotal] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  return (
    <WordCloudContext.Provider
      value={{
        words,
        setWords,
        pdfs,
        setPdfs,
        total,
        setTotal,
        currentTotal,
        setCurrentTotal,
      }}
    >
      {children}
    </WordCloudContext.Provider>
  );
}
