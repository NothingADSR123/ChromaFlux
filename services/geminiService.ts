import { GoogleGenAI, Modality } from "@google/genai";
import type { ImagePart } from '../types';

// =======================================================================
// IMPORTANT: For local development ONLY.
// 1. Replace "YOUR_API_KEY_HERE" with your actual Google Gemini API key.
// 2. DO NOT commit this file with your key to a public repository.
// 3. This model (gemini-2.5-flash-image-preview) requires a billed account.
// =======================================================================
const API_KEY = "YOUR_API_KEY_HERE";

if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
  throw new Error("API_KEY is not set. Please replace 'YOUR_API_KEY_HERE' with your actual key in services/geminiService.ts");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const modelName = 'gemini-2.5-flash-image-preview';

/**
 * Edits an image based on a text prompt using the Nano Banana model.
 * @param originalImage The original image part to edit.
 * @param prompt The text prompt describing the desired edit.
 * @returns A promise that resolves with the edited image part and model name.
 */
export const editImage = async (
  originalImage: ImagePart,
  prompt: string
): Promise<{ newImagePart: ImagePart; model: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          originalImage,
          { text: prompt },
        ],
      },
      config: {
        // Must include both Modality.IMAGE and Modality.TEXT
        responseModalities: [Modality.IMAGE, Modality.TEXT], 
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart?.inlineData) {
      return {
        newImagePart: {
          inlineData: {
            data: imagePart.inlineData.data,
            mimeType: imagePart.inlineData.mimeType,
          },
        },
        model: modelName,
      };
    } else {
      // Check for blocked responses or other text-only feedback
      const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
      if (textPart?.text) {
          throw new Error(`The model returned a text response instead of an image: "${textPart.text}"`);
      }
      throw new Error("The model did not return a valid image. The prompt may have been blocked.");
    }
  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error && error.message.includes('429')) {
       throw new Error("API rate limit exceeded. Please wait a moment and try again.");
    }
     if (error instanceof Error && error.message.includes('prompt was blocked')) {
       throw new Error("Your prompt was blocked for safety reasons. Please try a different prompt.");
    }
    throw new Error(`Failed to communicate with the AI model. ${error instanceof Error ? error.message : ''}`);
  }
};
