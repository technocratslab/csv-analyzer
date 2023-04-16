import { useRouter } from "next/router";
import { FileUploader } from "@/components/FileUploader";
import { Alert } from "@/components/Alert/Alert";
import { useState } from "react";
import { Spinner } from "@/components/Spinner/Spinner";

type FileUploadStatus = "idle" | "uploading" | "completed" | "failed";

export default function Home() {
  const [uploadingStatus, setUploadingStatus] =
    useState<FileUploadStatus>("idle");

  const router = useRouter();

  function onFileUpload(fileId: string | undefined) {
    setUploadingStatus("completed");
    if (!fileId) {
      setUploadingStatus("failed");
      return;
    }
    router.push("/results/" + fileId);
  }

  return (
    <div className="h-screen p-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
      <h1 className="text-3xl font-bold mb-10">Welcome to CSV Analyzer!</h1>

      {uploadingStatus === "failed" ? (
        <Alert
          type="error"
          message="Failed to create file vector. There is something wrong with your OPENAI_API_KEY"
        />
      ) : null}

      {uploadingStatus === "uploading" ? (
        <div className="flex gap-2 py-2 px-4 items-center border rounded-lg border-2 border-indigo-500">
          <Spinner />
          <span>Please wait while we are uploading your file</span>
        </div>
      ) : null}

      <FileUploader
        onFileUpload={onFileUpload}
        onUploadStart={() => setUploadingStatus("uploading")}
      />
    </div>
  );
}
