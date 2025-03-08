import { useWordCloud } from "../../../../../hooks/useWordCloud";
import { CheckIcon, LoadingSpinnerAnimation } from "../../Icons";

export function ProgressStates() {
  const { progress, pdfs } = useWordCloud();
  const current = progress.current;
  const total = progress.total;
  const pdf = pdfs[progress.current]?.name || "";

  const display = {
    NONE: "No hay archivos subidos",
    PROCESSING: (
      <span className="flex justify-center items-center gap-2">
        Procesando archivo: {pdf}
        <span className="font-semibold">
          {current}/{total}
        </span>{" "}
        <LoadingSpinnerAnimation width={24} height={24} />
      </span>
    ),
    PROCESSED: (
      <span className="flex justify-center items-center gap-2 ">
        Archivos procesados{" "}
        <span className="font-semibold">
          {current}/{total}
        </span>{" "}
        <CheckIcon className="text-green-600" />
      </span>
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

  return <div>{display[state()]}</div>;
}
