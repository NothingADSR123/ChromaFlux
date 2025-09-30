
import React, { useState, useCallback } from 'react';
import { editImage } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditorWorkspace } from './components/EditorWorkspace';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { ImagePart } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImagePart | null>(null);
  const [editedImage, setEditedImage] = useState<ImagePart | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modelVersion, setModelVersion] = useState<string>('');

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setEditedImage(null); // Clear previous edit
    setPrompt(''); // Clear previous prompt

    try {
      const imagePart = await fileToGenerativePart(file);
      setOriginalImage(imagePart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image.');
      setOriginalImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please provide both an image and a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const { newImagePart, model } = await editImage(originalImage, prompt);
      setEditedImage(newImagePart);
      setModelVersion(model);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const resetState = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
    setModelVersion('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      {isLoading && <Loader />}
      <div className="container mx-auto max-w-7xl">
        <Header modelVersion={modelVersion} />
        {error && <ErrorDisplay message={error} onClose={() => setError(null)} />}
        
        <main className="mt-8">
          {!originalImage ? (
            <ImageUploader onFileChange={handleFileChange} />
          ) : (
            <EditorWorkspace
              originalImage={originalImage}
              editedImage={editedImage}
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerateClick}
              onReset={resetState}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
