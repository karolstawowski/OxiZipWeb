import { useState } from "preact/hooks";
import { FileUploader as FU } from "react-drag-drop-files";
import { createZipArchive } from "../lib/compress";

const fileTypes = ["JPG", "PNG", "GIF", "TXT", "CFG"];

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [zipData, setZipData] = useState<Uint8Array | null>(null);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const downloadZipFile = async () => {
    if (file) {
      const archive = await createZipArchive(file);
      if (!archive) return null;
      setZipData(archive);
      const blob = new Blob([archive], { type: "application/zip" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "archive.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <FU
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes="bg-gray-300 !border-solid"
      />
      <button onClick={downloadZipFile} disabled={!file}>
        Download ZIP Archive
      </button>
    </>
  );
}
