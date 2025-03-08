import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { useWordCloud } from "../../../../hooks/useWordCloud";
import { UploadFileIcon } from "../Icons";
import { ToastContainer } from "react-toastify";

export function PdfInput() {
  const { updateWords, setProgress, setPdfs, pdfs } = useWordCloud();

  const onDrop = (acceptedFiles: File[]) => {
    setProgress((prev) => ({
      ...prev,
      total: prev.total + acceptedFiles.length,
    }));
    acceptedFiles.map(async (file) => {
      const exists = pdfs.some((pdf) => pdf.name === file.name);
      if (exists) {
        console.warn(`El archivo ${file.name} ya fue agregado.`);
        return;
      }

      await setPdfs((prev) => [...prev, file]);
      await updateWords({ file });
      setProgress((prev) => ({ ...prev, current: prev.current + 1 }));
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop,
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={clsx(
        "w-full h-64 box-border flex py-4 flex-col items-center justify-center border-4 border-gray-300 border-dashed rounded-lg cursor-pointer",
        "hover:bg-gray-100",
        {
          "bg-gray-50": !isDragActive,
          "bg-gray-100 border-green-300": isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      <UploadFileIcon
        className="text-gray-300"
        width={"200"}
        height={"200"}
        strokeWidth={"1.4"}
      />
      <p className="mb-2 text-lg text-gray-500 dark:text-gray-400 text-center">
        <span className="font-semibold">Click para subir</span> o arrastre los
        archivos aquí
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Formatos permitidos: .pdf
      </p>
      <ToastContainer />
    </div>
  );
}
