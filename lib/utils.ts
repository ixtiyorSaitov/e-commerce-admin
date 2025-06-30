import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    // MIME turi aniq rasm bo'lishi kerak
    const mimeType = blob.type;
    const extension = mimeType.split("/")[1] || "png";

    // Tasodifiy fayl nomi
    const fileName = `image-${Date.now()}.${extension}`;

    return new File([blob], fileName, { type: mimeType });
  } catch (error) {
    console.error("convertBlobUrlToFile xato:", error);
    throw new Error("Blob URL dan filega aylantirishda xatolik");
  }
}
