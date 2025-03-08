import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud, { Word } from "d3-cloud";
import { useWordCloud } from "../../../../../hooks/useWordCloud";
import { D3CloudAdapter } from "../../../adapter/d3-cloud.adapter";
import { WordCloudState } from "./state";

const WordCloud = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wordDataRef = useRef<Word[]>([]);

  const { progress, settings, words } = useWordCloud();
  const current = progress.current;
  const total = progress.total;
  const wordsConverted = D3CloudAdapter(words, settings);

  useEffect(() => {
    if (current < total || (current === 0 && total === 0)) return;
    const layout = cloud()
      .size([settings.width, settings.height])
      .words(wordsConverted)
      .padding(1)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d) => Math.max(10, Math.min(100, (d.size || 0) * 0.8)))
      .spiral("archimedean")
      .on("end", () => {
        wordDataRef.current = wordsConverted;
        drawWords();
      });

    layout.start();
  }, [
    current,
    wordsConverted.length,
    settings.exclude.length,
    settings.minFrequency,
    settings.maxWords,
  ]);

  const drawWords = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const group = svg
      .append("g")
      .attr(
        "transform",
        `translate(${settings.width / 2},${settings.height / 2})`
      );

    group
      .selectAll("text")
      .data(wordDataRef.current)
      .enter()
      .append("text")
      .style("font-size", (d: Word) => `${d.size || 0}px`)
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
      .attr(
        "transform",
        (d: Word) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
      )
      .text((d: Word) => d.text || "");
  };

  return <WordCloudState svgRef={svgRef} />;
};

export default WordCloud;
