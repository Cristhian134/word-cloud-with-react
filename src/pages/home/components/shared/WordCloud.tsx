import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud, { Word } from "d3-cloud";
import { useWordCloud } from "../../../../hooks/useWordCloud";
import { D3CloudAdapter } from "../../adapter/d3-cloud.adapter";

const WordCloud = ({ width = 800, height = 800 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [wordData, setWordData] = useState([]);
  const { words, currentTotal, total } = useWordCloud();

  const wordsConverted = D3CloudAdapter(words);

  const descargarComoJPG = () => {
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
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = "wordcloud.jpg";
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  useEffect(() => {
    if (total !== currentTotal) return;

    const layout = cloud()
      .size([width, height])
      .words(wordsConverted)
      .padding(1)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d) => Math.max(10, (d.size || 0) * 0.8))
      .spiral("archimedean")
      .on("end", setWordData);

    layout.start();
  }, [wordsConverted.length, width, height]);

  useEffect(() => {
    if (total !== currentTotal) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const group = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    group
      .selectAll("text")
      .data(wordData)
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
  }, [wordData, width, height]);

  return (
    <>
      <button
        onClick={() => descargarComoJPG()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Descargar como JPG
      </button>
      <svg id="wordcloud" ref={svgRef} width={width} height={height}></svg>
    </>
  );
};

export default WordCloud;
