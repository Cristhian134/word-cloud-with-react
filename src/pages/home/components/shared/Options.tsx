import { useWordCloud } from "../../../../hooks/useWordCloud";
import { Settings } from "../../../../types";

export function Options() {
  const { settings, setSettings } = useWordCloud();

  const handleChange = (key: string, value: number | string) => {
    if (/^\d*$/.test(value.toString()) && Number(value) >= 1) {
      setSettings((prev: Settings) => ({
        ...prev,
        [key]: Number(value).toString(),
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
          placeholder="20"
          value={settings.minFrequency}
          onChange={(e) => handleChange("minFrequency", e.target.value)}
        />
      </label>
    </div>
  );
}
