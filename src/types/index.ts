export type WordInfo = Record<string, number>;

export type PdfBase = File;

export type Settings = {
  maxWords: number;
  minFrequency: number;
  width: number;
  height: number;
};

export type Progress = {
  current: number;
  total: number;
};

export type WordCloudContextType = {
  words: WordInfo;
  updateWords: ({ words }: { words: WordInfo }) => void;
  clearWords: () => void;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  pdfs: PdfBase[];
  setPdfs: React.Dispatch<React.SetStateAction<PdfBase[]>>;
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
};

export type UpdateWordsAction = {
  type: "UPDATE_WORDS";
  payload: { words: WordInfo };
};

export type ClearWordsAction = {
  type: "CLEAR_WORDS";
};

export type WordCloudAction = UpdateWordsAction | ClearWordsAction;
