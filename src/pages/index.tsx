import { useRouter } from "next/router";
import { FileUploader } from "@/components/FileUploader";


export default function Home() {
  const router = useRouter();

  function onFileUpload(fileId: String) {
    // Process the uploaded file here
    console.log("File uploaded:", fileId);
    // Call API to analyze file
    // redirect to result page with file id
    router.push("/results/" + fileId);
    // router.push('/results/[id]', `/pages/${fileId}`)
  }
  return (
    <div className="h-screen p-10">
      <FileUploader onFileUpload={onFileUpload} />
    </div>
  );
}
