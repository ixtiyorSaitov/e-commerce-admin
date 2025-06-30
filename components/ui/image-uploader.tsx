"use client";

import {
  type ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import { Button } from "./button";
import { Upload, X, Trash2 } from "lucide-react";
import Image from "next/image";

interface UploadImage {
  error: string | null;
  setImageError: Dispatch<SetStateAction<string | null>>;
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
}

export default function ImageUploader({
  error,
  setImageError,
  imageUrls,
  setImageUrls,
  loading,
}: UploadImage) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImagesUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newImagesUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  const clearAllImages = () => {
    setImageUrls([]);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        disabled={loading}
        ref={imageInputRef}
        onChange={handleImageChange}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => imageInputRef.current?.click()}
          disabled={loading}
        >
          <Upload className="w-4 h-4 mr-2" />
          Select Images
        </Button>

        {imageUrls.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearAllImages}
            disabled={loading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => (
            <div key={url} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                <Image
                  src={url || "/placeholder.svg"}
                  fill
                  className="object-cover"
                  alt={`Preview ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  disabled={loading}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-[13px] text-destructive">{error}</p>}
    </div>
  );
}
