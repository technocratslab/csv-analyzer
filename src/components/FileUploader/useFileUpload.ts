type UseFileUploadHook = (p: { onSuccess: (id: string) => void }) => {
  onFileUpload: (file: File) => Promise<null | undefined>;
};

export const useFileUpload: UseFileUploadHook = ({ onSuccess }) => {
  const handleFileUpload = async (file: File) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    const uploadPath = "/api/upload";

    try {
      const response = await fetch(uploadPath, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onSuccess(data.id);
    } catch (error) {
      throw error;
    }
  };

  return { onFileUpload: handleFileUpload };
};
