import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { processPdf } from "../../services/pdfjs-dist.service";
import { useState } from "react";
import WordCloud from "./WordCloud";
import { useWordCloud } from "../../../../hooks/useWordCloud";

export function PdfInput() {
  const { words, setWords, setTotal, setCurrentTotal } = useWordCloud();

  const onDrop = (acceptedFiles) => {
    setTotal((prev) => acceptedFiles.length + prev);
    acceptedFiles.forEach(async (file) => {
      const newWords = await processPdf(file);
      const auxWords = { ...words };
      for (const newWord in newWords) {
        if (newWord in auxWords) {
          auxWords[newWord] += newWords[newWord];
        } else {
          auxWords[newWord] = newWords[newWord];
        }
      }
      setWords(auxWords);
      setCurrentTotal((prev) => prev + 1);
    });
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop,
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={clsx(
        "w-full h-64 box-border flex flex-col items-center justify-center border-4 border-gray-300 border-dashed rounded-lg cursor-pointer",
        "hover:bg-gray-100",
        {
          "bg-gray-50": !isDragActive,
          "bg-gray-100 border-green-300": isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
    </div>
  );
}
