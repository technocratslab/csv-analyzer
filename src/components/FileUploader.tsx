import { useState } from "react";


type Props = {
  onFileUpload: ((fileId: string) => void);
};

const FileUploader: React.FC<Props> = ({ 
    onFileUpload 
  }) => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('Give me important analysis from the data');
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };
  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append('question', question!)
    // const uploadPath = "/api/upload-csv";
    const uploadPath = "/api/upload";

    const response = await fetch(uploadPath, {
      method: "POST",
      body: formData,
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
    const data = await response.json();
    // onFileUpload(data.id);
    setAnalysisResults(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="mx-5 inline-grid">
      <label htmlFor="file-upload" className="block mb-2 font-medium text-gray-700">
        Upload a CSV file:
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4"
      />
      <input
        id="question"
        type="text"
        value={question}
        placeholder="Question"
        onChange={onQuestionChange}
        className="text-black border border-gray-400 rounded-md px-4 py-2 mb-4"
      >
      </input>
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white rounded-md px-4 py-2 font-medium"
      >
        Analyze CSV
      </button>
      {analysisResults && (
        <div>
          <h2 className="text-lg font-bold mt-4 mb-2">Analysis Results:</h2>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
