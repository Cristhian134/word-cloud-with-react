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
  words: WordInfo;
  setWords: any;
  setPdfs: any;
  total: number;
  setTotal: any;
  currentTotal: number;
  setCurrentTotal: any;
};
