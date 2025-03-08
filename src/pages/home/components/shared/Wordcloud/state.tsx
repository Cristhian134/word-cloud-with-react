import { useWordCloud } from "../../../../../hooks/useWordCloud";

export function WordCloudState({
  svgRef,
}: {
  svgRef: React.RefObject<SVGSVGElement | null>;
}) {
  const { progress, settings } = useWordCloud();
  const current = progress.current;
  const total = progress.total;

  const display = {
    NONE: (
      <div className="w-full h-[50dvh] border-[1px] border-gray-200 bg-gray-100 flex justify-center items-center"></div>
    ),
    PROCESSING: (
      <div className="space-y-8 h-[50dvh] flex items-center justify-center animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center bg-gray-300 border-[1px]">
        <svg
          className="w-[20%] h-[20%] text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
    ),
    PROCESSED: (
      <div className="w-full h-auto bg-white border-[1px] border-gray-200">
        <svg
          id="wordcloud"
          ref={svgRef}
          width={settings.width}
          height={settings.height}
        ></svg>
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

  return <div className="w-full h-auto bg-white">{display[state()]}</div>;
}
