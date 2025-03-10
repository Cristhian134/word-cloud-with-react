import { useEffect, useRef, useState } from "react";
import { useWordCloud } from "../../../../../hooks/useWordCloud";
import clsx from "clsx";

export function WordsInclusion() {
  const ref = useRef<HTMLDivElement>(null);
  const [openSelect, setOpenSelect] = useState(false);
  const { words, settings, setSettings } = useWordCloud();

  const wordsIncluded: { text: string; size: number }[] = [];
  const wordsExcluded: { text: string; size: number }[] = [];

  for (const word in words) {
    const wordItem: { text: string; size: number } = {
      size: words[word],
      text: word,
    };
    if (
      words[word] >= settings.minFrequency &&
      !settings.exclude.includes(word)
    ) {
      wordsIncluded.push(wordItem);
    } else {
      wordsExcluded.push(wordItem);
    }
  }

  if (wordsIncluded.length)
    wordsIncluded.sort((a, b) => (b.size || 0) - (a.size || 0));
  if (wordsExcluded.length)
    wordsExcluded.sort((a, b) => (b.size || 0) - (a.size || 0));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChangeOpen = (
    value: boolean,
    word: string,
    exclude: boolean,
    size: number
  ) => {
    if (!value || !word) return false;

    if (exclude && size >= settings.minFrequency) {
      setSettings((prev) => ({ ...prev, exclude: [...prev.exclude, word] }));
      return true;
    } else {
      const filteredWords = settings.exclude.filter((word) => word !== word);
      setSettings((prev) => ({ ...prev, exclude: filteredWords }));
      return false;
    }
  };

  return (
    <div
      ref={ref}
      className="text-black flex items-center justify-center flex-col max-md:w-full"
    >
      <button
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className={clsx(
          "border cursor-pointer border-gray-300 rounded-lg p-2 w-full",
          {
            "ring-blue-500 ring-2 outline-none": openSelect,
          }
        )}
      >
        Filtrar palabras (Total {wordsIncluded.length + wordsExcluded.length})
      </button>
      <div className="transition-all duration-300 ease-in-out">
        <div
          className={clsx(
            "transition-all absolute w-full right-0 max-w-[600px] duration-300 ease-in-out bg-white p-3 border border-gray-300 rounded-lg",
            { "hidden h-0": !openSelect },
            { "block h-[200px]": openSelect }
          )}
        >
          <div className="flex gap-2 items-center justify-center">
            <div className="flex flex-col w-[calc(100%*0.5)] gap-2">
              <span className="block h-[24px]">
                Palabras incluidas ({wordsIncluded.length}):
              </span>
              <div className="overflow-y-auto h-[calc(200px-0.75rem*2-24px-8px)] border border-gray-200 rounded-lg">
                <ul className="overflow-hidden flex flex-col gap-3 p-2">
                  {wordsIncluded.map(({ text, size }, idx) => {
                    return (
                      <li
                        className="flex justify-between items-center"
                        key={idx}
                      >
                        <span className="w-full text-ellipsis" title={text}>
                          ({idx}) {text}
                        </span>
                        <span className="flex gap-2 justify-between items-center">
                          <span>{size}</span>
                          <input
                            onChange={(e) => {
                              handleChangeOpen(
                                e.target.checked,
                                text || "",
                                true,
                                size || 0
                              );
                            }}
                            title="Click para excluir"
                            type="checkbox"
                            className="w-6 h-6"
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex flex-col w-[calc(100%*0.5)] gap-2">
              <span className="block h-[24px]">
                Palabras excluidas ({wordsExcluded.length}):
              </span>
              <div className="overflow-y-auto h-[calc(200px-0.75rem*2-24px-8px)] border border-gray-200 rounded-lg">
                <ul className="overflow-hidden flex flex-col gap-2 p-2">
                  {wordsExcluded.map(({ text, size }, idx) => {
                    return (
                      <li className="flex justify-between" key={idx}>
                        <span className="w-full text-ellipsis" title={text}>
                          ({idx}) {text}
                        </span>
                        <span className="flex gap-2 justify-between items-center">
                          <span>{size}</span>
                          <input
                            onChange={(e) => {
                              handleChangeOpen(
                                e.target.checked,
                                text || "",
                                false,
                                size || 0
                              );
                            }}
                            title="Click para incluir"
                            type="checkbox"
                            className="w-6 h-6"
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
