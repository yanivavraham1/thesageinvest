import { uploadImageToCloudinary } from "@/actions/upload-image";
import { useRef, useState } from "react";
interface CloudinaryImageUploaderProps {
  setImageUrl: (url: string) => void;
}
export default function CloudinaryImageUploader({
  setImageUrl,
}: CloudinaryImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    setIsUploading(true);
    setError("");

    try {
      const file = fileInputRef.current?.files?.[0];

      if (!file || file.size === 0) {
        setError("Please select a file");
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadImageToCloudinary(formData);

      if (!result.success) {
        throw new Error(result.error || "Upload failed");
      } else {
        setImageUrl(result.url || "");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Upload error:", err);
        setError("Error uploading image: " + (err.message || "Unknown error"));
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Image to Cloudinary</h2>
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <label className="block cursor-pointer">
            <span className="text-gray-600">Select an image to upload</span>
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              className="block w-full mt-2 text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
