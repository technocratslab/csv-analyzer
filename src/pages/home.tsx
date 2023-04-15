import FileUploader from '@/components/FileUploader';
import { useRouter } from 'next/router';


function HomePage() {
  const router = useRouter();
  
  function onFileUpload(fileId: String) {
    // Process the uploaded file here
    console.log('File uploaded:', fileId);
    // Call API to analyze file
    // redirect to result page with file id
    router.push('/results/' + fileId);
    // router.push('/results/[id]', `/pages/${fileId}`)

  }
  return (
    <div>
      <h1>Upload Your CSV File</h1>
      <FileUploader onFileUpload={onFileUpload}/>
    </div>
  );
}

export default HomePage