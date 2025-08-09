"use client";

import { addAudioItem } from "@/actions/audio";
import { useState } from "react";

// type UploadMusicProps = {
//   onUploadComplete?: () => void;
// };

export default function UploadMusic({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/hascloud/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        console.log("File uploaded successfully:", data);
        await addAudioItem(data);
        if (onUploadComplete) onUploadComplete();
      } else {
        alert("Uploadda problem var");
      }
    } catch (error) {
      alert("Upload zamanı xəta baş verdi");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm !w-full">
      <label
        htmlFor="file-upload"
        className={`cursor-pointer bg-pink-600
                  text-white px-4 py-2 rounded  
                  hover:bg-pink-700 inline-block 
                    !w-full text-center
                    ${uploading ? "opacity-50 !cursor-not-allowed" : ""}
      `}
      >
        {uploading ? "Yüklənir..." : "Musiqi yükləmək üçün kliklə"}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="audio/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}
