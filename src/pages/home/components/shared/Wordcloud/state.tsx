import { useWordCloud } from "../../../../../hooks/useWordCloud";
import { LoadingImageIcon } from "../../Icons";

export function WordCloudState({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const { progress } = useWordCloud();
  const current = progress.current;
  const total = progress.total;

  const display = {
    NONE: (
      <div className="w-full h-[50dvh] border-[1px] border-gray-200 bg-gray-100 flex justify-center items-center"></div>
    ),
    PROCESSING: (
      <div className="w-full space-y-8 h-[50dvh] flex items-center justify-center animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center bg-gray-300 border-[1px]">
        <LoadingImageIcon className="w-[20%] h-[20%] text-gray-200 dark:text-gray-600" />
      </div>
    ),
    PROCESSED: (
      <div className="w-full h-auto bg-white border-[1px] border-gray-200 flex justify-center items-center">
        <canvas ref={canvasRef} className="w-full" id="wordcloud" />
      </div>
    ),
  };

  const state = () => {
    if (current === 0 && total === 0) {
      return "NONE";
    }

    if (current < total) {
      return "PROCESSING";
    } else {
      return "PROCESSED";
    }
  };

  return <>{display[state()]}</>;
}
