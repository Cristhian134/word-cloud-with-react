import { PdfBase, Progress, Settings } from "../types";

export const IMAGES_ACTION_TYPES = {
  CLEAR_WORDS: "CLEAR_WORDS",
  UPDATE_WORDS: "UPDATE_WORDS",
} as const;

export const SettingsInitialState: Settings = {
  maxWords: 5,
  minFrequency: 5,
  width: 800,
  height: 800,
};

export const ProgressInitialState: Progress = {
  current: 0,
  total: 0,
};

export const PdfsInitialState: PdfBase[] = [];
