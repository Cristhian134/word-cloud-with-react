import { useWordCloud } from "../../../../hooks/useWordCloud";
import { D3CloudAdapter } from "../../adapter/d3-cloud.adapter";
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

    const svgElement = document.getElementById("wordcloud");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = settings.width;
      canvas.height = settings.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = "wordcloud-imagen.jpg";
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const downloadTXT = () => {
    if (disabled) return;

    const wordcloud = D3CloudAdapter(words, settings);
    const content = wordcloud.map((item) => item.text).join("\n");
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
