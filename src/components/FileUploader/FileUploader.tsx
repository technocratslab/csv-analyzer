import { useState } from "react";
import { Button } from "../Button";
import { useFileUpload } from "./useFileUpload";

type Props = {
  onFileUpload: (fileId: string) => void;
  onUploadStart: () => void;
};

export const FileUploader: React.FC<Props> = ({ onFileUpload, onUploadStart }) => {
  const [file, setFile] = useState<File | null>(null);
  const { onFileUpload: handleUpload } = useFileUpload({
    onSuccess: onFileUpload,
  });

  const handleFileUpload = () => {
    if (!file) return;
    handleUpload(file);
    onUploadStart();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="grid">
      <label
        htmlFor="file-upload"
        className="block mb-2 font-medium text-gray-700"
      >
        Upload a CSV file:
      </label>

      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4"
      />

      <Button disabled={!file} onClick={handleFileUpload}>
        Upload File & Analyse
      </Button>
    </div>
  );
};
