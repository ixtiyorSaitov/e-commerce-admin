"use client";

import { type ChangeEvent, useRef, useState, useTransition } from "react";

import { Button } from "./button";

import { CloudUpload, Upload, X, Trash2 } from "lucide-react";

import Image from "next/image";

import { convertBlobUrlToFile } from "@/lib/utils";

import { uploadImage } from "@/supabase/storage/client";

export default function ImageUploader() {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const newImagesUrls = filesArray.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImagesUrls]);
    }
  };

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = () => {
    startTransition(async () => {
      const urls = [];

      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,

          bucket: "dank-pics",
        });

        if (error) {
          console.error(error);

          return;
        }

        urls.push(imageUrl);
      }

      console.log(urls);

      setImageUrls([]);
    });
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
        ref={imageInputRef}
        onChange={(e) => handleImageChange(e)}
        disabled={isPending}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => imageInputRef.current?.click()}
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
            disabled={isPending}
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
                  disabled={isPending}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {imageUrls.length > 0 && (
        <Button
          type="button"
          disabled={isPending}
          onClick={handleClickUploadImagesButton}
          className="w-full"
        >
          {isPending ? (
            <>
              <CloudUpload className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <CloudUpload className="w-4 h-4 mr-2" />
              Upload Images
            </>
          )}
        </Button>
      )}
    </div>
  );
}
