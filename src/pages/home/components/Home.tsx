import { WordCloudProvider } from "../../../contexts/WordCloud";
import { PdfInput } from "./shared/PdfInput";
import { Progress } from "./shared/Progress";
import WordCloud from "./shared/WordCloud";

export function Home() {
  return (
    <div className="px-12 w-full flex justify-center items-center flex-col gap-2 py-4">
      <WordCloudProvider>
        <PdfInput />
        <Progress />
        <WordCloud />
      </WordCloudProvider>
    </div>
  );
}
