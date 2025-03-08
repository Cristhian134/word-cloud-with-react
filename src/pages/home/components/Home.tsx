import { WordCloudProvider } from "../../../contexts/wordcloud.provider";
import { Buttons } from "./shared/Buttons";
import { Options } from "./shared/Options";
import { PdfInput } from "./shared/PdfInput";
import { Progress } from "./shared/Progress/Progress";
import WordCloud from "./shared/Wordcloud/WordCloud";

export function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-3 py-4 xl:px-60 lg:px-16 md:px-5 px-3">
      <WordCloudProvider>
        <div className="w-full flex flex-col gap-3">
          <Options />
          <PdfInput />
        </div>
        <Progress />
        <Buttons />
        <WordCloud />
      </WordCloudProvider>
    </div>
  );
}
