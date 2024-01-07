export default async function s3UploadImage(file: Blob | File) {
  if (!file) throw new Error("File is required.");
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/s3-upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.fileUrl;
}
