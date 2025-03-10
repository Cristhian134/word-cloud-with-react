import { useWordCloud } from "../../../../hooks/useWordCloud";
import { Settings } from "../../../../types";
import { WordsInclusion } from "./Wordcloud/WordsInclusion";

export function Options() {
  const { settings, setSettings } = useWordCloud();

  const handleChange = (key: string, value: string) => {
    if (/^\d*$/.test(value.toString())) {
      setSettings((prev: Settings) => ({
        ...prev,
        [key]: value === "" ? "1" : value,
      }));
    }
  };

  return (
    <div className="md:flex-row w-full flex-col text-black flex justify-center items-center gap-3">
      <label className="flex gap-2 items-center max-[400px]:items-start max-[400px]:flex-col max-[400px]:w-full">
        Cantidad de palabras a mostrar:
        <input
          className="border w-20 max-[400px]:w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="20"
          value={settings.maxWords}
          onChange={(e) => handleChange("maxWords", e.target.value)}
        />
      </label>
      <label className="flex gap-2 items-center max-[400px]:items-start max-[400px]:flex-col max-[400px]:w-full">
        Frecuencia mínima por palabra:
        <input
          className="border w-20 max-[400px]:w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          min={1}
          placeholder="20"
          value={settings.minFrequency}
          onChange={(e) => handleChange("minFrequency", e.target.value)}
        />
      </label>
      <WordsInclusion />
    </div>
  );
}
