import { useState } from "react";
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
    <div className="grid mt-10">
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

      <button
        disabled={!file}
        onClick={handleFileUpload}
        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800 mr-0 ${
          !file ? "cursor-not-allowed bg-blue-400" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        }`}
      >
        Upload File & Analyse
      </button>
    </div>
  );
};
