import { useWordCloud } from "../../../../hooks/useWordCloud";

export function Progress() {
  const { currentTotal, total } = useWordCloud();

  return (
    <span>
      {currentTotal}/{total}
    </span>
  );
}
