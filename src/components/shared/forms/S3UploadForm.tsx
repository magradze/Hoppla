"use client";

import s3UploadImage from "@/lib/s3UploadImage";
import { useRef, useState } from "react";

type S3UploadFormProps = {
  onChange: (fileUrl: string) => void;
  value?: string;
};

export default function S3UploadForm({ onChange, value }: S3UploadFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <input
        type="file"
        className="hidden"
        id="uploadS3Img"
        ref={fileRef}
        onChange={(e) => {
          const file = e.target.files![0];
          if (!file) return;
          setUploading(true);
          s3UploadImage(file).then((fileUrl) => {
            onChange(fileUrl);
            setUploading(false);
          });
        }}
      />
      {!uploading && (
        <label htmlFor="uploadS3Img">
          <img src={value || "/defaultPhoto.png"} alt="preview" />
        </label>
      )}
      {uploading && <img src="/loading.gif" alt="" />}
    </div>
  );
}
