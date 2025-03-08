import { IMAGES_ACTION_TYPES } from "../consts";
import { UpdateWordsAction, WordCloudAction, WordInfo } from "../types";

const UPDATE_WORDCLOUD_STATE_BY_ACTION = {
  [IMAGES_ACTION_TYPES.UPDATE_WORDS]: (
    state: WordInfo,
    action: UpdateWordsAction
  ): WordInfo => {
    const { words } = action.payload;
    if (words) {
      const auxWords: WordInfo = { ...state };
      for (const word in words) {
        if (word in auxWords) {
          auxWords[word] += words[word];
        } else {
          auxWords[word] = words[word];
        }
      }
      return auxWords;
    } else {
      return state;
    }
  },
  [IMAGES_ACTION_TYPES.CLEAR_WORDS]: (state: WordInfo): WordInfo => {
    if (Object.keys(state).length > 0) {
      return {};
    } else {
      return state;
    }
  },
} as const;

export const WordCloudReducer = (state: WordInfo, action: WordCloudAction) => {
  const { type } = action;
  const updateState = UPDATE_WORDCLOUD_STATE_BY_ACTION[type];
  return updateState ? updateState(state, action) : state;
};
