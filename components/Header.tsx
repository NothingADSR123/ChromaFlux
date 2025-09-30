
import React from 'react';

interface HeaderProps {
    modelVersion: string;
}

export const Header: React.FC<HeaderProps> = ({ modelVersion }) => (
  <header className="text-center border-b-2 border-indigo-500/30 pb-4">
    <h1 className="text-4xl sm:text-5xl font-bold">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
        AI Photo Editor
      </span>
    </h1>
    <p className="mt-2 text-lg text-gray-400">
      Powered by{' '}
      <span className="font-semibold text-indigo-400">
        Nano Banana ({modelVersion || 'gemini-2.5-flash-image-preview'})
      </span>
    </p>
  </header>
);
