export type WordInfo = Record<string, number>;

export type PdfInfo = {
  words: WordInfo;
};

export type PdfBase = {
  file: File;
  info?: PdfInfo;
};

export type WordCloudContextType = {
  pdfs: PdfBase[];
  setPdfs: React.Dispatch<React.SetStateAction<PdfBase[]>>;
  words: WordInfo;
  setWords: React.Dispatch<React.SetStateAction<WordInfo>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  currentTotal: number;
  setCurrentTotal: React.Dispatch<React.SetStateAction<number>>;
};
