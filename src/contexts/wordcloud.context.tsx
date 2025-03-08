import { createContext } from "react";
import { WordCloudContextType } from "../types";

export const WordCloudContext = createContext<WordCloudContextType | undefined>(
  undefined
);
