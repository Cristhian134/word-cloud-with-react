import { useWordCloud } from "../../../../hooks/useWordCloud";
import { Wordcloud2JsAdapter } from "../../adapter/wordcloud2Js.adapter";
import { PdfsInitialState, ProgressInitialState } from "../../../../consts";
import Button from "../ui/Button";

export function Buttons() {
  const { progress, setProgress, words, settings, clearWords, setPdfs } =
    useWordCloud();
  const currentTotal = progress.current;
  const total = progress.total;
  const disabled = currentTotal < total || (currentTotal === 0 && total === 0);

  const downloadJPG = () => {
    if (disabled) return;

    const canvas = document.getElementById(
      "wordcloud"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    const a = document.createElement("a");
    const url = canvas.toDataURL("image/jpeg");
    a.href = url;
    a.download = "wordcloud-imagen.jpg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTXT = () => {
    if (disabled) return;

    const wordcloud = Wordcloud2JsAdapter(words, settings);
    const content = wordcloud.map((item) => `${item[0]} ${item[1]}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "wordcloud-palabras.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const restartWordcloud = () => {
    if (disabled) return;
    clearWords();
    setProgress(ProgressInitialState);
    setPdfs(PdfsInitialState);
  };

  return (
    <div className="flex gap-3 md:flex-row flex-col md:w-fit w-full">
      <Button onClick={downloadJPG} disabled={disabled}>
        Descargar imagen JPG
      </Button>
      <Button onClick={downloadTXT} disabled={disabled}>
        Descargar TXT de palabras
      </Button>
      <Button onClick={restartWordcloud} disabled={disabled}>
        Generar otra nube de palabras
      </Button>
    </div>
  );
}
