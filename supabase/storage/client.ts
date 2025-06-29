import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createSupabaseClient } from "../client";
import { supabaseUrl } from "@/lib/supabase";

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

export async function uploadImage({ file, bucket, folder }: UploadProps) {
  const fileName = file.name;
  const fileExtensions = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtensions}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error(error);
    return { imageUrl: "", error: "Image compression failed" };
  }

  const storage = getStorage();
  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { imageUrl: "", error: "Image upload failed" };
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${data?.path}`;

  return { imageUrl, error: "" };
}
