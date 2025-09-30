
import React from 'react';
import type { ImagePart } from '../types';

interface EditorWorkspaceProps {
  originalImage: ImagePart;
  editedImage: ImagePart | null;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const ImageDisplay: React.FC<{ title: string; imagePart: ImagePart | null, isPlaceholder?: boolean }> = ({ title, imagePart, isPlaceholder = false }) => (
  <div className="w-full flex flex-col items-center p-2">
    <h3 className="text-lg font-semibold text-gray-400 mb-3">{title}</h3>
    <div className="aspect-square w-full rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700">
      {imagePart ? (
        <img
          src={`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`}
          alt={title}
          className="object-contain w-full h-full"
        />
      ) : (
        isPlaceholder && (
          <div className="flex flex-col items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a.75.75 0 01.75.75v5.714a2.25 2.25 0 00.659 1.591L14.25 14.5M9.75 3.104a6.375 6.375 0 00-4.125 1.402l-.625.625a2.25 2.25 0 000 3.182l2.25 2.25a2.25 2.25 0 003.182 0l.625-.625a6.375 6.375 0 004.125-1.402m-4.125-1.402c-.375.023-.75.05-1.125.082a9 9 0 00-6.086.654l-.625.625a2.25 2.25 0 000 3.182l2.25 2.25a2.25 2.25 0 003.182 0l.625-.625a9 9 0 006.086-.654c.375-.032.75-.06 1.125-.082" />
            </svg>
            <span className="mt-2 text-sm">AI generation will appear here</span>
          </div>
        )
      )}
    </div>
  </div>
);

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  originalImage,
  editedImage,
  prompt,
  setPrompt,
  onGenerate,
  onReset,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <ImageDisplay title="Original" imagePart={originalImage} />
        <ImageDisplay title="Edited" imagePart={editedImage} isPlaceholder={true} />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your edit... e.g., 'make the sky a vibrant sunset' or 'add a pirate hat to the cat'"
          className="w-full max-w-3xl p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
          rows={3}
          disabled={isLoading}
        />
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={onGenerate}
                disabled={isLoading || !prompt}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-lg"
            >
                {isLoading ? 'Generating...' : 'Generate'}
            </button>
            <button
                onClick={onReset}
                disabled={isLoading}
                className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
                Upload New Image
            </button>
        </div>
      </div>
    </div>
  );
};
