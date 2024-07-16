"use client"; // Make this component a client component
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import clsx from "clsx";
import { Experience } from "@/lib/definitions";

const FileUploadForm = ({ objectToSearch }: { objectToSearch?: Experience }) => {
  const [images, setImages] = useState<File[]>([]);
  // const [uploading, setUploading] = useState(false);
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   images.forEach((image, i) => {
  //     formData.append(image.name, image);
  //   });
  //   setUploading(true);
  //   await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   setUploading(false);
  // };
  return (
    // <form className="w-full" onSubmit={handleSubmit}>
      <div className="col-span-5 col-start-2">
        <CustomFileSelector
          accept="image/png, image/jpeg"
          onChange={handleFileSelected}
        />
        {/* <button
          type="submit"
          className={clsx(
            "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md",
            {
              "disabled pointer-events-none opacity-40": uploading,
            }
          )}
          disabled={uploading}
        >
          Upload
        </button> */}
      <ImagePreview images={images} objectToSearch={objectToSearch}/>
      </div>
    // </form>
  );
};

export default FileUploadForm;
