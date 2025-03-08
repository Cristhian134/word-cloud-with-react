import { useReducer, useState } from "react";
import { PdfBase, Progress, Settings, WordInfo } from "../types";
import {
  PdfsInitialState,
  ProgressInitialState,
  SettingsInitialState,
} from "../consts";
import { WordCloudReducer } from "./wordcloud.reducer";
import { WordCloudContext } from "./wordcloud.context";

function useWordCloudReducer() {
  const [state, dispatch] = useReducer(WordCloudReducer, {});

  const updateWords = ({ words }: { words: WordInfo }) => {
    dispatch({
      type: "UPDATE_WORDS",
      payload: { words },
    });
  };

  const clearWords = () => {
    dispatch({
      type: "CLEAR_WORDS",
    });
  };

  return {
    state,
    updateWords,
    clearWords,
  };
}

export function WordCloudProvider({ children }: { children: React.ReactNode }) {
  const { state, clearWords, updateWords } = useWordCloudReducer();
  const [progress, setProgress] = useState<Progress>(ProgressInitialState);
  const [pdfs, setPdfs] = useState<PdfBase[]>(PdfsInitialState);
  const [settings, setSettings] = useState<Settings>(SettingsInitialState);

  return (
    <WordCloudContext.Provider
      value={{
        words: state,
        clearWords,
        updateWords,
        progress,
        setProgress,
        pdfs,
        setPdfs,
        settings,
        setSettings,
      }}
    >
      {children}
    </WordCloudContext.Provider>
  );
}
