import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";
import { useWordCloud } from "../../../../../hooks/useWordCloud";
import { WordCloudState } from "./state";
import { Wordcloud2JsAdapter } from "../../../adapter/wordcloud2Js.adapter";

export default function Other() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { words, settings } = useWordCloud();
  const wordsAdapted = Wordcloud2JsAdapter(words, settings);

  console.log(wordsAdapted, wordsAdapted.length);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = settings.width;
      canvas.height = settings.height;
      WordCloud(canvasRef.current, {
        list: wordsAdapted,
        gridSize: 4,
        weightFactor: 1,
        fontFamily: "Arial",
        color: () => `hsl(${Math.random() * 360}, 100%, 50%)`,
        backgroundColor: "#ffffff",
        rotateRatio: 0.5,
        rotationSteps: 2,
      });
    }
  }, [wordsAdapted, settings]);

  return (
    <div className="flex flex-col items-center w-full">
      <WordCloudState canvasRef={canvasRef} />
    </div>
  );
}
