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

type DeleteProps = {
  url: string;
  bucket: string;
};

export async function deleteImage({ url, bucket }: DeleteProps) {
  try {
    const path = url.split(`${bucket}/`)[1]; // masalan: products/123.jpg
    if (!path) throw new Error("URLdan path ajratib bo‘lmadi");

    const supabase = createSupabaseClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    console.error("Supabase image delete error:", error);
    return { success: false, error };
  }
}