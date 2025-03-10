import { PdfBase, Progress, Settings, WordInfo } from "../types";

export const IMAGES_ACTION_TYPES = {
  CLEAR_WORDS: "CLEAR_WORDS",
  UPDATE_WORDS: "UPDATE_WORDS",
} as const;

export const SettingsInitialState: Settings = {
  maxWords: 50,
  exclude: [],
  minFrequency: 5,
  width: 1200,
  height: 1200,
};

export const ProgressInitialState: Progress = {
  current: 0,
  total: 0,
};

export const PdfsInitialState: PdfBase[] = [];

export const WordCloudInitialState: WordInfo = {};
