import { useState } from "react";

type Props = {
  onFileUpload: (fileId: string) => void;
};

export const FileUploader: React.FC<Props> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const uploadPath = "/api/upload";

    const response = await fetch(uploadPath, {
      method: "POST",
      body: formData,
    }).catch((err) => {
      console.error(err);
      throw err;
    });

    const data = await response.json();
    onFileUpload(data.id);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="mx-5 grid">
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
        onClick={handleFileUpload}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Upload File & Analyse
      </button>
    </div>
  );
};
