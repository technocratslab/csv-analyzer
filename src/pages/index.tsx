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
    <div className="min-h-screen p-4 pt-24 bg-gradient-to-r from-indigo-200 to-purple-300">
      <div className="max-w-5xl m-auto grid gap-6">
        <h1 className="text-3xl text-black font-semibold">Welcome to CSV Analyzer!</h1>

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
    </div>
  );
}
