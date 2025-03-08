import { PdfBase, Progress, Settings, WordInfo } from "../types";

export const IMAGES_ACTION_TYPES = {
  CLEAR_WORDS: "CLEAR_WORDS",
  UPDATE_WORDS: "UPDATE_WORDS",
} as const;

export const SettingsInitialState: Settings = {
  maxWords: 5,
  exclude: [],
  minFrequency: 5,
  width: 800,
  height: 800,
};

export const ProgressInitialState: Progress = {
  current: 0,
  total: 0,
};

export const PdfsInitialState: PdfBase[] = [];

export const WordCloudInitialState: WordInfo = {
  // tas: 4,
  // asdad: 4,
  // adasd: 4,
  // asagsddad: 4,
  // tadfgds: 4,
  // asdfgddad: 4,
  // dgdf: 4,
  // adfgdfsdad: 4,
  // tdfgas: 4,
  // asddfgad: 4,
};
