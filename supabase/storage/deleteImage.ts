import { createSupabaseClient } from "../client";

type DeleteProps = {
  url: string;
  bucket: string;
};

export async function deleteImage({ url, bucket }: DeleteProps) {
  const { storage } = createSupabaseClient();
  const parts = url.split(`/${bucket}/`);
  if (parts.length !== 2) return;

  const path = parts[1];
  await storage.from(bucket).remove([path]);
}
