
import type { ImagePart } from './types';

const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // result is a data URL (e.g., "data:image/png;base64,iVBORw0KGgo...")
      // We only need the base64 part.
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Converts a File object into a Gemini-API-compatible ImagePart object.
 * @param file The image file.
 * @returns A promise that resolves with an ImagePart object.
 */
export const fileToGenerativePart = async (file: File): Promise<ImagePart> => {
  if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}. Please upload a JPEG, PNG, WEBP, or GIF.`);
  }

  const base64Data = await fileToBase64(file);
  
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
};
